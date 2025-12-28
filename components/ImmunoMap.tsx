import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface NodeData {
  id: string;
  group: number;
  val: number;
  description?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface LinkData {
  source: string | NodeData;
  target: string | NodeData;
}

const ImmunoMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  const nodesRaw: NodeData[] = [
    { id: "INMUNOMODULADORES", group: 0, val: 35, description: "Fármacos que alteran la respuesta inmune." },
    
    // RAMA 1: Inmunosupresores
    { id: "INMUNOSUPRESORES", group: 1, val: 25, description: "Reducen respuesta. Usos: Autoinmunidad, Trasplantes." },
    
    // 1. Anticuerpos
    { id: "Anticuerpos", group: 2, val: 18, description: "Bloquean receptores o células específicas." },
    { id: "Policlonales", group: 2, val: 12, description: "Globulinas Antilinfocíticas/Antitimocíticas." },
    { id: "Monoclonales (mAb)", group: 2, val: 15, description: "Infliximab (anti-TNF), Muromonab (anti-CD3)." },

    // 2. Inmunofilinas
    { id: "Unión a Inmunofilinas", group: 3, val: 20, description: "Inhiben activación de Linfocitos T." },
    { id: "Ciclofilinas (Inh. Calcineurina)", group: 3, val: 15, description: "Ciclosporina, Tacrolimus. Depresión medular." },
    { id: "Inh. mTOR", group: 3, val: 12, description: "Rapamicina (Sirolimus). Detiene ciclo celular." },

    // 3. Glucocorticoides
    { id: "Glucocorticoides", group: 4, val: 18, description: "Antiinflamatorios/Inmunosupresores potentes." },
    { id: "Prednisona (IV en Agudos)", group: 4, val: 12, description: "Metilprednisolona. Crisis de rechazo." },

    // 4. Citostáticos
    { id: "Citostáticos", group: 5, val: 15, description: "Frenan proliferación celular rápida." },
    { id: "Azatioprina", group: 5, val: 10, description: "Inhibe síntesis purinas." },
    { id: "Metotrexato", group: 5, val: 10, description: "Antifolato." },
    { id: "Ciclofosfamida", group: 5, val: 10, description: "Alquilante." },
    { id: "Micofenolato", group: 5, val: 10, description: "Inhibe proliferación linfocitos." },

    // 5. Nuevos
    { id: "Nuevos Inmunosupresores", group: 6, val: 12, description: "Anakinra, Etanercept, Leflunomida." },

    // RAMA 2: Inmunoestimulantes
    { id: "INMUNOESTIMULADORES", group: 7, val: 25, description: "Potencian respuesta. Usos: Inmunodeficiencias, Cáncer." },
    { id: "Interferones (INF)", group: 8, val: 15, description: "Alfa, Beta, Gamma. Antivirales y Antineoplásicos." },
    { id: "Inmunoglobulinas", group: 8, val: 15, description: "De plasma humano. Aportan Ac pasivos." },
    { id: "Levamisol", group: 8, val: 10, description: "Sintético. Potencia respuesta T." },
  ];

  const linksRaw: LinkData[] = [
    { source: "INMUNOMODULADORES", target: "INMUNOSUPRESORES" },
    { source: "INMUNOMODULADORES", target: "INMUNOESTIMULADORES" },

    // Inmunosupresores
    { source: "INMUNOSUPRESORES", target: "Anticuerpos" },
    { source: "INMUNOSUPRESORES", target: "Unión a Inmunofilinas" },
    { source: "INMUNOSUPRESORES", target: "Glucocorticoides" },
    { source: "INMUNOSUPRESORES", target: "Citostáticos" },
    { source: "INMUNOSUPRESORES", target: "Nuevos Inmunosupresores" },

    { source: "Anticuerpos", target: "Policlonales" },
    { source: "Anticuerpos", target: "Monoclonales (mAb)" },

    { source: "Unión a Inmunofilinas", target: "Ciclofilinas (Inh. Calcineurina)" },
    { source: "Unión a Inmunofilinas", target: "Inh. mTOR" },

    { source: "Glucocorticoides", target: "Prednisona (IV en Agudos)" },

    { source: "Citostáticos", target: "Azatioprina" },
    { source: "Citostáticos", target: "Metotrexato" },
    { source: "Citostáticos", target: "Ciclofosfamida" },
    { source: "Citostáticos", target: "Micofenolato" },

    // Inmunoestimulantes
    { source: "INMUNOESTIMULADORES", target: "Interferones (INF)" },
    { source: "INMUNOESTIMULADORES", target: "Inmunoglobulinas" },
    { source: "INMUNOESTIMULADORES", target: "Levamisol" },
  ];

  useEffect(() => {
    if (!svgRef.current) return;
    const nodes = JSON.parse(JSON.stringify(nodesRaw));
    const links = JSON.parse(JSON.stringify(linksRaw));
    const width = 1400; 
    const height = 900;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "width: 100%; height: 100%; font-family: 'Montserrat', sans-serif;");

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(140)) 
      .force("charge", d3.forceManyBody().strength(-400)) 
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.08))
      .force("collide", d3.forceCollide().radius((d: any) => d.val * 3 + 15).iterations(3));

    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("class", "node-group")
      .style("cursor", "grab")
      .call(drag(simulation) as any);

    node.append("circle")
      .attr("r", (d: any) => d.val * 2.5)
      .attr("fill", (d: any) => {
         // Theme: Cyan/Teal based
         const colors = ["#222", "#ef4444", "#3b82f6", "#06b6d4", "#f59e0b", "#8b5cf6", "#ec4899", "#10b981", "#14b8a6"];
         return colors[d.group % colors.length];
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 3)
      .on("click", (event, d) => {
        if (event.defaultPrevented) return;
        setSelectedNode(d as NodeData);
      });

    node.append("text")
      .text((d: any) => d.id)
      .attr("x", 0)
      .attr("y", (d: any) => -d.val * 2.5 - 12) 
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "900")
      .attr("stroke", "black")
      .attr("stroke-width", 4)
      .attr("fill", "none")
      .style("pointer-events", "none");

    node.append("text")
      .text((d: any) => d.id)
      .attr("x", 0)
      .attr("y", (d: any) => -d.val * 2.5 - 12)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "700")
      .attr("fill", "white")
      .style("pointer-events", "none");

    simulation.on("tick", () => {
       nodes.forEach((d: any) => {
        const r = d.val * 2.5;
        const padding = 20; 
        if (d.x < r + padding) d.x = r + padding;
        if (d.x > width - r - padding) d.x = width - r - padding;
        if (d.y < r + padding) d.y = r + padding;
        if (d.y > height - r - padding) d.y = height - r - padding;
      });

      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
    }
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-[#1e1e2e] relative">
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="text-[10px] text-white/30 uppercase tracking-widest bg-black/20 px-2 py-1 rounded">Mapa Mental: Inmunología</span>
      </div>
      <div className="flex-1 w-full h-full overflow-hidden">
        <svg ref={svgRef} className="w-full h-full block touch-none"></svg>
        {selectedNode && (
          <div className="absolute bottom-6 left-6 max-w-sm bg-white p-5 rounded-2xl shadow-2xl border-l-8 border-cyan-500 animate-fade-in-up z-20">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-black text-gray-900 mb-1 leading-tight">{selectedNode.id}</h3>
              <button onClick={() => setSelectedNode(null)} className="text-gray-400 hover:text-gray-800 font-bold ml-4">✕</button>
            </div>
            <p className="text-gray-700 text-sm mt-1">{selectedNode.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImmunoMap;