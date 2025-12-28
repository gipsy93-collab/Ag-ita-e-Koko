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

const DiureticMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  const nodesRaw: NodeData[] = [
    { id: "DIURÉTICOS", group: 0, val: 35, description: "Fármacos que aumentan la eliminación de orina y electrolitos." },
    
    // RAMA 1: Máxima Eficacia
    { id: "MÁXIMA EFICACIA (ASA)", group: 1, val: 25, description: "Actúan en el Asa de Henle (Ascendente)." },
    { id: "Furosemida", group: 1, val: 15, description: "Inhibe Na/K/2Cl. Potente. Elimina K+ y Ca++." },
    { id: "Torasemida", group: 1, val: 12, description: "Larga duración." },
    { id: "Ácido Etacrínico", group: 1, val: 10, description: "Alternativa en alergia a sulfamidas." },

    // RAMA 2: Eficacia Media
    { id: "MEDIA EFICACIA (TIAZIDAS)", group: 2, val: 20, description: "Actúan en Túbulo Contorneado Distal." },
    { id: "Hidroclorotiazida", group: 2, val: 15, description: "Inhibe reabsorción Na/Cl. Ahorra Ca++." },
    { id: "Clortalidona", group: 2, val: 12, description: "Larga vida media. HTA." },
    { id: "Indapamida", group: 2, val: 12, description: "Perfil metabólico neutro." },

    // RAMA 3: Eficacia Ligera
    { id: "LIGERA / AHORRADORES K+", group: 3, val: 18, description: "Túbulo Colector. Evitan hipopotasemia." },
    { id: "Espironolactona", group: 3, val: 15, description: "Antagonista Aldosterona. Evita remodelado." },
    { id: "Amilorida / Triamtereno", group: 3, val: 12, description: "Bloquean canales de Na+ (ENaC)." },

    // RAMA 4: Osmóticos
    { id: "OSMÓTICOS", group: 4, val: 15, description: "Inertes. Arrastran agua por ósmosis." },
    { id: "Manitol", group: 4, val: 12, description: "Vía IV. Edema cerebral, glaucoma." },
    { id: "Isosorbida", group: 4, val: 10, description: "Vía Oral/IV. Glaucoma." },

    // RAMA 5: Inhibidores AC
    { id: "INHIBIDORES AC", group: 5, val: 15, description: "Túbulo Proximal. Alcalinizan orina." },
    { id: "Acetazolamida", group: 5, val: 12, description: "Glaucoma, Mal de montaña." },
  ];

  const linksRaw: LinkData[] = [
    { source: "DIURÉTICOS", target: "MÁXIMA EFICACIA (ASA)" },
    { source: "DIURÉTICOS", target: "MEDIA EFICACIA (TIAZIDAS)" },
    { source: "DIURÉTICOS", target: "LIGERA / AHORRADORES K+" },
    { source: "DIURÉTICOS", target: "OSMÓTICOS" },
    { source: "DIURÉTICOS", target: "INHIBIDORES AC" },

    { source: "MÁXIMA EFICACIA (ASA)", target: "Furosemida" },
    { source: "MÁXIMA EFICACIA (ASA)", target: "Torasemida" },
    { source: "MÁXIMA EFICACIA (ASA)", target: "Ácido Etacrínico" },

    { source: "MEDIA EFICACIA (TIAZIDAS)", target: "Hidroclorotiazida" },
    { source: "MEDIA EFICACIA (TIAZIDAS)", target: "Clortalidona" },
    { source: "MEDIA EFICACIA (TIAZIDAS)", target: "Indapamida" },

    { source: "LIGERA / AHORRADORES K+", target: "Espironolactona" },
    { source: "LIGERA / AHORRADORES K+", target: "Amilorida / Triamtereno" },

    { source: "OSMÓTICOS", target: "Manitol" },
    { source: "OSMÓTICOS", target: "Isosorbida" },

    { source: "INHIBIDORES AC", target: "Acetazolamida" },
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
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(120)) 
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
         // Theme: Water/Blue based
         const colors = ["#222", "#2563eb", "#0ea5e9", "#06b6d4", "#60a5fa", "#3b82f6"];
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
        <span className="text-[10px] text-white/30 uppercase tracking-widest bg-black/20 px-2 py-1 rounded">Mapa Mental: Diuréticos</span>
      </div>
      <div className="flex-1 w-full h-full overflow-hidden">
        <svg ref={svgRef} className="w-full h-full block touch-none"></svg>
        {selectedNode && (
          <div className="absolute bottom-6 left-6 max-w-sm bg-white p-5 rounded-2xl shadow-2xl border-l-8 border-blue-500 animate-fade-in-up z-20">
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

export default DiureticMap;