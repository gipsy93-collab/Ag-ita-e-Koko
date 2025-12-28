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

const ViralMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  const nodesRaw: NodeData[] = [
    { id: "ANTIVÍRICOS", group: 0, val: 35, description: "Fármacos que inhiben la replicación viral." },
    
    // RAMA 1: NO VIH
    { id: "NO VIH", group: 1, val: 25, description: "Herpes, Gripe, CMV, etc." },
    
    { id: "Herpesvirus", group: 2, val: 20, description: "VHS, VVZ." },
    { id: "Aciclovir / Valaciclovir", group: 2, val: 15, description: "Análogos de nucleósidos. Inhiben ADN polimerasa." },
    { id: "Famciclovir", group: 2, val: 10, description: "Profármaco de Penciclovir." },

    { id: "Citomegalovirus (CMV)", group: 3, val: 20, description: "Infecciones graves en inmunodeprimidos." },
    { id: "Ganciclovir", group: 3, val: 15, description: "Mielotóxico. Para CMV." },
    { id: "Foscarnet", group: 3, val: 12, description: "Alternativa resistente. Nefrotóxico." },

    { id: "Gripe / Respiratorios", group: 4, val: 20, description: "Influenza A/B." },
    { id: "Amantadina", group: 4, val: 10, description: "Clásico (Influenza)." },
    { id: "Oseltamivir / Zanamivir", group: 4, val: 15, description: "Inhibidores Neuraminidasa." },
    { id: "Ribavirina", group: 4, val: 12, description: "VSR, Hepatitis C. Amplio espectro." },

    { id: "Interferones", group: 5, val: 15, description: "Alfa, Beta, Gamma. Inmunomoduladores." },

    // RAMA 2: VIH (Antirretrovirales)
    { id: "VIH / SIDA", group: 6, val: 25, description: "Terapia antirretroviral." },
    { id: "ITI (Transcriptasa Inversa)", group: 7, val: 18, description: "Nucleósidos que bloquean TI." },
    { id: "Zidovudina (AZT)", group: 7, val: 12, description: "El clásico." },
    { id: "Lamivudina / Didanosina", group: 7, val: 10, description: "Otros ITI nucleósidos." },

    { id: "IP (Proteasas)", group: 8, val: 18, description: "Inhibidores de Proteasa. Viriones inmaduros." },
    { id: "Ritonavir", group: 8, val: 12, description: "Potenciador farmacocinético." },
    { id: "Saquinavir / Indinavir", group: 8, val: 10, description: "Otros IP." },

    // RAMA 3: COVID-19
    { id: "COVID-19", group: 9, val: 20, description: "Tratamientos en estudio/uso." },
    { id: "Remdesivir", group: 9, val: 15, description: "Protocolo de investigación. Inhibe ARN polimerasa." },
    { id: "Lopinavir/Ritonavir", group: 9, val: 12, description: "IP reutilizados." },
    { id: "Ac. Monoclonales", group: 9, val: 12, description: "Valor terapéutico potencial." },
  ];

  const linksRaw: LinkData[] = [
    { source: "ANTIVÍRICOS", target: "NO VIH" },
    { source: "ANTIVÍRICOS", target: "VIH / SIDA" },
    { source: "ANTIVÍRICOS", target: "COVID-19" },

    // No VIH
    { source: "NO VIH", target: "Herpesvirus" },
    { source: "NO VIH", target: "Citomegalovirus (CMV)" },
    { source: "NO VIH", target: "Gripe / Respiratorios" },
    { source: "NO VIH", target: "Interferones" },

    { source: "Herpesvirus", target: "Aciclovir / Valaciclovir" },
    { source: "Herpesvirus", target: "Famciclovir" },

    { source: "Citomegalovirus (CMV)", target: "Ganciclovir" },
    { source: "Citomegalovirus (CMV)", target: "Foscarnet" },

    { source: "Gripe / Respiratorios", target: "Amantadina" },
    { source: "Gripe / Respiratorios", target: "Oseltamivir / Zanamivir" },
    { source: "Gripe / Respiratorios", target: "Ribavirina" },

    // VIH
    { source: "VIH / SIDA", target: "ITI (Transcriptasa Inversa)" },
    { source: "VIH / SIDA", target: "IP (Proteasas)" },

    { source: "ITI (Transcriptasa Inversa)", target: "Zidovudina (AZT)" },
    { source: "ITI (Transcriptasa Inversa)", target: "Lamivudina / Didanosina" },

    { source: "IP (Proteasas)", target: "Ritonavir" },
    { source: "IP (Proteasas)", target: "Saquinavir / Indinavir" },

    // COVID
    { source: "COVID-19", target: "Remdesivir" },
    { source: "COVID-19", target: "Lopinavir/Ritonavir" },
    { source: "COVID-19", target: "Ac. Monoclonales" },
    { source: "COVID-19", target: "Oseltamivir / Zanamivir" }, // Crosslink mentioned in PDF for flu coinfection
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
         // Theme: Toxic Green / Biohazard
         const colors = ["#222", "#10b981", "#34d399", "#6ee7b7", "#059669", "#047857", "#a3e635", "#84cc16", "#65a30d", "#ec4899"];
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
        <span className="text-[10px] text-white/30 uppercase tracking-widest bg-black/20 px-2 py-1 rounded">Mapa Mental: Antivíricos</span>
      </div>
      <div className="flex-1 w-full h-full overflow-hidden">
        <svg ref={svgRef} className="w-full h-full block touch-none"></svg>
        {selectedNode && (
          <div className="absolute bottom-6 left-6 max-w-sm bg-white p-5 rounded-2xl shadow-2xl border-l-8 border-emerald-500 animate-fade-in-up z-20">
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

export default ViralMap;