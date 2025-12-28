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

const OncoMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  // Data Classification based on Theme 13
  const nodesRaw: NodeData[] = [
    { id: "ANTINEOPLÁSICOS", group: 0, val: 30, description: "Fármacos que impiden la formación de neoplasias." },
    
    // Grupo 1: ADN/ARN
    { id: "ADN/ARN Synthesis", group: 1, val: 20, description: "Fármacos que actúan sobre síntesis de ADN, ARN y proteínas." },
    { id: "Antimetabolitos", group: 1, val: 15, description: "Imitan metabolitos naturales." },
    { id: "Alquilantes", group: 1, val: 15, description: "Añaden grupos alquilo al ADN (enlaces cruzados)." },
    { id: "Platinos", group: 1, val: 12, description: "Cisplatino, Carboplatino. Nefrotóxicos y emetógenos." },
    { id: "Antibióticos Antitumorales", group: 1, val: 12, description: "Doxorrubicina (Cardiotóxico), Bleomicina." },
    { id: "Topoisomerasas", group: 1, val: 10, description: "Inhiben enzimas de desenrollado (Topotecán, Etopósido)." },

    // Fármacos específicos G1
    { id: "Metotrexato", group: 1, val: 8, description: "Antifolato. Inhibe dihidrofolato reductasa." },
    { id: "5-FU / Citarabina", group: 1, val: 8, description: "Análogos Pirimidinas." },
    { id: "Ciclofosfamida", group: 1, val: 8, description: "Alquilante. Cistitis hemorrágica (Mesna)." },

    // Grupo 2: Antimitóticos
    { id: "Antimitóticos", group: 2, val: 18, description: "Inhiben la mitosis (Fase M). Actúan en microtúbulos." },
    { id: "Vinca (Vincristina)", group: 2, val: 10, description: "Impiden polimerización (formación) de microtúbulos." },
    { id: "Taxanos (Paclitaxel)", group: 2, val: 10, description: "Impiden desensamblaje (congelan) microtúbulos." },

    // Grupo 3: Hormonales
    { id: "Hormonales", group: 3, val: 15, description: "Para tumores hormono-dependientes (Mama, Próstata)." },
    { id: "Tamoxifeno", group: 3, val: 10, description: "Antiestrogénico (Cáncer de Mama)." },
    { id: "Inhib. Aromatasa", group: 3, val: 8, description: "Aminoglutetimida. Cortan síntesis estrógenos." },
    { id: "Antiandrógenos", group: 3, val: 8, description: "Flutamida (Cáncer Próstata)." },
    
    // Grupo 4: Inmunoterapia
    { id: "Inmunoterapia", group: 4, val: 15, description: "Ayudan al sistema inmune a combatir el cáncer." },
    { id: "Ac. Monoclonales", group: 4, val: 10, description: "Rituximab, Cetuximab (-mab)." },
    { id: "Interferones/IL", group: 4, val: 8, description: "Estimulan defensas." },
    { id: "BCG", group: 4, val: 8, description: "Vacuna intravesical (Vejiga)." },

    // Nuevos
    { id: "Nuevos (Dianas)", group: 5, val: 12, description: "Terapia Dirigida." },
    { id: "Imatinib (-nib)", group: 5, val: 10, description: "Inhibidores Tirosina Quinasa." },
    { id: "Bortezomib", group: 5, val: 10, description: "Inhibidor del Proteasoma." },
  ];

  const linksRaw: LinkData[] = [
    { source: "ANTINEOPLÁSICOS", target: "ADN/ARN Synthesis" },
    { source: "ANTINEOPLÁSICOS", target: "Antimitóticos" },
    { source: "ANTINEOPLÁSICOS", target: "Hormonales" },
    { source: "ANTINEOPLÁSICOS", target: "Inmunoterapia" },
    { source: "ANTINEOPLÁSICOS", target: "Nuevos (Dianas)" },

    { source: "ADN/ARN Synthesis", target: "Antimetabolitos" },
    { source: "ADN/ARN Synthesis", target: "Alquilantes" },
    { source: "ADN/ARN Synthesis", target: "Platinos" },
    { source: "ADN/ARN Synthesis", target: "Antibióticos Antitumorales" },
    { source: "ADN/ARN Synthesis", target: "Topoisomerasas" },

    { source: "Antimetabolitos", target: "Metotrexato" },
    { source: "Antimetabolitos", target: "5-FU / Citarabina" },
    { source: "Alquilantes", target: "Ciclofosfamida" },

    { source: "Antimitóticos", target: "Vinca (Vincristina)" },
    { source: "Antimitóticos", target: "Taxanos (Paclitaxel)" },

    { source: "Hormonales", target: "Tamoxifeno" },
    { source: "Hormonales", target: "Inhib. Aromatasa" },
    { source: "Hormonales", target: "Antiandrógenos" },

    { source: "Inmunoterapia", target: "Ac. Monoclonales" },
    { source: "Inmunoterapia", target: "Interferones/IL" },
    { source: "Inmunoterapia", target: "BCG" },

    { source: "Nuevos (Dianas)", target: "Imatinib (-nib)" },
    { source: "Nuevos (Dianas)", target: "Bortezomib" },
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
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150)) 
      .force("charge", d3.forceManyBody().strength(-500)) 
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.05))
      .force("collide", d3.forceCollide().radius((d: any) => d.val * 3 + 10).iterations(3));

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
      .attr("r", (d: any) => d.val * 2.8)
      .attr("fill", (d: any) => {
         const colors = ["#222", "#ef4444", "#3b82f6", "#eab308", "#10b981", "#8b5cf6"];
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
      .attr("y", (d: any) => -d.val * 2.8 - 12) 
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
      .attr("y", (d: any) => -d.val * 2.8 - 12)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "700")
      .attr("fill", "white")
      .style("pointer-events", "none");

    simulation.on("tick", () => {
       nodes.forEach((d: any) => {
        const r = d.val * 2.8;
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
        <span className="text-[10px] text-white/30 uppercase tracking-widest bg-black/20 px-2 py-1 rounded">Mapa Mental: Oncología</span>
      </div>
      <div className="flex-1 w-full h-full overflow-hidden">
        <svg ref={svgRef} className="w-full h-full block touch-none"></svg>
        {selectedNode && (
          <div className="absolute bottom-6 left-6 max-w-sm bg-white p-5 rounded-2xl shadow-2xl border-l-8 border-orange-500 animate-fade-in-up z-20">
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

export default OncoMap;