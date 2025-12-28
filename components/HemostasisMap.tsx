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

const HemostasisMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  const nodesRaw: NodeData[] = [
    { id: "HEMOSTASIA", group: 0, val: 35, description: "Fármacos que afectan la coagulación y agregación." },
    
    // RAMA 1: Antiagregantes
    { id: "ANTIAGREGANTES", group: 1, val: 25, description: "Previenen la activación plaquetaria (Trombo Blanco)." },
    { id: "Inh. COX", group: 1, val: 18, description: "AAS (dosis bajas), Triflusal. Inhiben TXA2." },
    { id: "Inh. ADP", group: 1, val: 18, description: "Clopidogrel, Ticlopidina. Receptores P2Y12." },
    { id: "Antag. GP IIb/IIIa", group: 1, val: 15, description: "Abciximab, Tirofibán. Bloquean unión fibrinógeno." },
    { id: "AMPc Alto", group: 1, val: 12, description: "Dipiridamol, Iloprost. Bajan calcio intraplaquetario." },

    // RAMA 2: Anticoagulantes
    { id: "ANTICOAGULANTES", group: 2, val: 25, description: "Inhiben la cascada de coagulación (Trombo Rojo)." },
    
    // Heparinas
    { id: "Heparinas (Parenterales)", group: 3, val: 20, description: "Activan Antitrombina III." },
    { id: "HNF (Sódica/Cálcica)", group: 3, val: 15, description: "IV/SC. Requiere monitorización TTPa. Antídoto: Protamina." },
    { id: "HBPM (Bajo Peso)", group: 3, val: 15, description: "Enoxaparina. SC. Actividad anti-Xa > anti-IIa. No monitorización rutinaria." },
    { id: "Fondaparinux", group: 3, val: 12, description: "Sintético. Inhibidor selectivo Xa." },

    // Orales
    { id: "Orales (AVK)", group: 4, val: 20, description: "Antivitaminas K. Efecto lento." },
    { id: "Acenocumarol / Warfarina", group: 4, val: 15, description: "Control INR (2-3). Antídoto: Vitamina K." },

    // Nuevos (Directos)
    { id: "Directos (NACO/DOAC)", group: 5, val: 18, description: "Acción directa sobre factores." },
    { id: "Anti-Trombina (IIa)", group: 5, val: 15, description: "Dabigatrán (Oral), Hirudinas (Parenteral)." },
    { id: "Anti-Factor Xa", group: 5, val: 15, description: "Rivaroxabán, Apixabán. Orales." },

    // RAMA 3: Fibrinólisis
    { id: "FIBRINOLÍSIS", group: 6, val: 20, description: "Degradación del coágulo." },
    { id: "Trombolíticos", group: 6, val: 15, description: "Activan Plasminógeno -> Plasmina. Alteplasa (t-PA), Uroquinasa." },
    { id: "Antifibrinolíticos", group: 6, val: 15, description: "Inhiben degradación (Antihemorrágicos). Ác. Tranexámico." },
  ];

  const linksRaw: LinkData[] = [
    { source: "HEMOSTASIA", target: "ANTIAGREGANTES" },
    { source: "HEMOSTASIA", target: "ANTICOAGULANTES" },
    { source: "HEMOSTASIA", target: "FIBRINOLÍSIS" },

    // Antiagregantes
    { source: "ANTIAGREGANTES", target: "Inh. COX" },
    { source: "ANTIAGREGANTES", target: "Inh. ADP" },
    { source: "ANTIAGREGANTES", target: "Antag. GP IIb/IIIa" },
    { source: "ANTIAGREGANTES", target: "AMPc Alto" },

    // Anticoagulantes
    { source: "ANTICOAGULANTES", target: "Heparinas (Parenterales)" },
    { source: "ANTICOAGULANTES", target: "Orales (AVK)" },
    { source: "ANTICOAGULANTES", target: "Directos (NACO/DOAC)" },

    { source: "Heparinas (Parenterales)", target: "HNF (Sódica/Cálcica)" },
    { source: "Heparinas (Parenterales)", target: "HBPM (Bajo Peso)" },
    { source: "Heparinas (Parenterales)", target: "Fondaparinux" },

    { source: "Orales (AVK)", target: "Acenocumarol / Warfarina" },

    { source: "Directos (NACO/DOAC)", target: "Anti-Trombina (IIa)" },
    { source: "Directos (NACO/DOAC)", target: "Anti-Factor Xa" },

    // Fibrinolisis
    { source: "FIBRINOLÍSIS", target: "Trombolíticos" },
    { source: "FIBRINOLÍSIS", target: "Antifibrinolíticos" },
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
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(110)) 
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
         // Theme: Blood/Red based
         const colors = ["#222", "#e11d48", "#be123c", "#9f1239", "#881337", "#f43f5e", "#fb7185"];
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
        <span className="text-[10px] text-white/30 uppercase tracking-widest bg-black/20 px-2 py-1 rounded">Mapa Mental: Hemostasia</span>
      </div>
      <div className="flex-1 w-full h-full overflow-hidden">
        <svg ref={svgRef} className="w-full h-full block touch-none"></svg>
        {selectedNode && (
          <div className="absolute bottom-6 left-6 max-w-sm bg-white p-5 rounded-2xl shadow-2xl border-l-8 border-rose-500 animate-fade-in-up z-20">
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

export default HemostasisMap;