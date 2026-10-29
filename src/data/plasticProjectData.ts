import { ProjectDocument } from '../types';

export const initialProjectDocument: ProjectDocument = {
  id: 'the-plastic-project',
  title: 'The Plastic Project: Circular Models & Sustainable Design',
  author: '2nd Year MBA Student in Sustainability Management',
  institution: 'School of Sustainability, Xavier University, Bhubaneswar',
  course: 'Circular Models & Sustainable Design',
  instructor: 'Prof. Dr. Sutapa Pati',
  targetCompany: 'Hydromo',
  totalPages: 11,
  executiveSummary:
    'Launched by the Ellen MacArthur Foundation in 2016, The New Plastic Economy aims to change the global flow of plastic packaging value chain by 2025 based on 3 key actions: Eliminate, Innovate, and Circulate. For Hydromo—with presence across Construction, Healthcare, and Education, especially in Water Bottling Plants—immense plastic use brings critical waste challenges. This project explores after-use plastic economics, near-infrared optical sorting, and advanced recovery across the 3 lenses of Business, Product, and Material levels.',
  keyMetrics: [
    {
      label: 'Plastic Waste Produced Since 1950',
      value: '6,300 Mt',
      context: 'Historical accumulated global plastic waste across the planet.',
    },
    {
      label: 'Historically Recycled',
      value: '9%',
      context: 'Only 9% recycled, while 79% ends up in landfills or open nature.',
    },
    {
      label: 'Energy Savings per Ton Recycled',
      value: '90%',
      context: 'Produces 1 ton of recycled plastic saving 5 barrels of oil & 1.6t CO2.',
    },
    {
      label: 'Ocean Plastic Leakage by 2025',
      value: '250 Mt',
      context: 'Projected plastic ending up in global marine ecosystems without circular intervention.',
    },
  ],
  scenes: [
    {
      id: 'scene-1',
      title: 'Global Plastic Crisis & Ocean Leakage',
      description: 'Dramatizing the 6,300 Mt global waste flow and the urgent call to protect marine ecosystems.',
      sourcePage: 1,
      aspectRatio: '16:9',
      visualFocus: 'Ocean currents, sunlight glistening on crystal water, subtle plastic debris transitioning into circular clean energy',
      suggestedPrompt:
        'Cinematic drone shot flying low over a sunlit azure ocean, crystal clear turquoise waves rolling gently toward a rugged coastline, golden hour sunlight reflecting off the water surface, crisp 8k photorealistic documentary footage, subtle volumetric mist, calm and poignant atmosphere.',
      tags: ['Ocean Crisis', '6,300 Mt Waste', 'Global Scale'],
      thumbnailGradient: 'from-blue-600 via-cyan-600 to-emerald-500',
    },
    {
      id: 'scene-2',
      title: 'High-Tech SUEZ Optical Laser Sorting',
      description: 'Near-infrared optical sorting and laser separation separating polymer resins by color and chemical signature.',
      sourcePage: 6,
      aspectRatio: '16:9',
      visualFocus: 'High-speed conveyor belts, pulsing emerald and amber lasers, transparent polymer flakes being sorted by pneumatic air jets',
      suggestedPrompt:
        'Cinematic macro shot inside a futuristic industrial recycling facility, high-speed automated conveyor carrying translucent plastic flakes illuminated by vibrant cyan and amber optical sorting laser beams, precision pneumatic jets separating particles, shallow depth of field, high-tech engineering aesthetic.',
      tags: ['SUEZ Technology', 'Laser Sorting', 'Near-Infrared'],
      thumbnailGradient: 'from-amber-600 via-emerald-600 to-teal-700',
    },
    {
      id: 'scene-3',
      title: "Plast'lab® Laboratory & Polymer Testing",
      description: "Advanced chemical lab testing recycled polymers for impact resistance, flexural modulus, and food-grade purity.",
      sourcePage: 7,
      aspectRatio: '16:9',
      visualFocus: 'Cleanroom laboratory equipment, glowing test beakers, precision robotic calipers measuring pristine polymer tensile strength',
      suggestedPrompt:
        'Cinematic eye-level shot inside a gleaming modern polymer research laboratory, clean white countertops with glass beakers and digital rheology instruments testing crystal-clear recycled plastic pellets, soft diffused volumetric cleanroom lighting, 4k ultra realistic, cinematic depth of field.',
      tags: ["Plast'lab", 'Food-Grade Virgin Quality', 'Polymer Testing'],
      thumbnailGradient: 'from-indigo-600 via-purple-600 to-pink-500',
    },
    {
      id: 'scene-4',
      title: 'Hydromo Clean Water Bottling Circular Loop',
      description: 'Hydromo water bottling line transitioning from single-use plastics to closed-loop refillable reverse-logistics.',
      sourcePage: 2,
      aspectRatio: '9:16',
      visualFocus: 'Ultra-pure water cascading into crystal-clear recycled PET bottles on an automated conveyor line',
      suggestedPrompt:
        'Cinematic vertical 9:16 slow-motion close-up of pure mineral water flowing into an elegant, crystal-clear 100% recycled PET bottle on a stainless steel bottling line, glistening water droplets, pristine reflections, soft daylight studio lighting, commercial product aesthetic.',
      tags: ['Hydromo Bottling', 'Clean Water', 'Closed-Loop PET'],
      thumbnailGradient: 'from-sky-500 via-blue-600 to-indigo-700',
    },
    {
      id: 'scene-5',
      title: 'From Flakes to High-Value Technical Materials',
      description: 'Transforming recycled polypropylene and LDPE into durable agricultural pipes and automotive components.',
      sourcePage: 8,
      aspectRatio: '16:9',
      visualFocus: 'Heated polymer extruders shaping molten recycled granules into sleek industrial pipes and composite automotive panels',
      suggestedPrompt:
        'Cinematic medium shot of an industrial extruder nozzle forming sleek dark recycled polymer piping, glowing thermal elements radiating warm amber light, steam rising gently in a state-of-the-art manufacturing plant, steady horizontal tracking camera movement, industrial craftsmanship.',
      tags: ['Material Transformation', 'Agriculture & Auto', 'Circular Value'],
      thumbnailGradient: 'from-emerald-700 via-teal-800 to-slate-900',
    },
    {
      id: 'scene-6',
      title: 'The 3 Lenses: Business, Product & Material',
      description: 'Conceptual visualization of the circular model decoupling production from fossil feedstocks.',
      sourcePage: 5,
      aspectRatio: '9:16',
      visualFocus: 'Abstract geometric rings representing the 3 circular lenses rotating seamlessly in equilibrium with nature',
      suggestedPrompt:
        'Vertical 9:16 cinematic shot of pristine natural green leaves intertwined with a glowing translucent geometric mobius loop made of crystal recycled material, morning dewdrops reflecting soft sunrise sunlight, slow upward crane motion, inspiring ecological future.',
      tags: ['The 3 Lenses', 'Fossil Decoupling', 'Circular Economy'],
      thumbnailGradient: 'from-emerald-600 via-green-500 to-lime-600',
    },
  ],
  pages: [
    {
      pageNumber: 1,
      title: 'Cover & Executive Context',
      subtitle: 'The Plastic Project by Xavier University Bhubaneswar',
      summary: 'Introduction to global plastic flow, highlighting how international consortiums and Hydromo can participate in the circular movement.',
      keyFacts: [
        '6,300 Mt plastic waste generated since 1950',
        'Only 9% recycled, 12% energy recovery, 79% landfills or nature',
        '335 Mt produced in 2016 growing to 380 Mt by 2025',
        '250 Mt plastic will end up in oceans without circular shift'
      ],
      suggestedPrompt:
        'Cinematic aerial shot of waves washing over a pristine sandy beach at sunrise, golden light sparkling on the foam, transition to a sparkling clean horizon, 8k documentary cinematography.',
      visualTheme: 'Oceanic & Environmental Awakening',
      ocrSnippet: 'The Plastic Project. I am a 2nd year student pursuing MBA in Sustainability Management from School of Sustainability, Xavier University, Bhubaneswar. Through this report, I wish to highlight the global plastic scenario, how international consortiums are making sense of it and how Hydromo could be a part of this global movement.',
    },
    {
      pageNumber: 2,
      title: 'Table of Content & Architecture',
      subtitle: 'Structure across Business, Product, and Material Levels',
      summary: 'Roadmap outlining challenges, after-use economy, Suez best practices, Plast\'lab testing, and strategic action plans.',
      keyFacts: [
        'Lays out 10 core chapters spanning theoretical foundations to industrial implementation',
        'Cross-value chain opportunities targeting closed-loop circularity',
        'Focus on Hydromo water bottling plants and commercial infrastructure'
      ],
      suggestedPrompt:
        'Smooth architectural pan across a modern sustainability design studio with blueprint diagrams of circular flow loops illuminated by morning light, photorealistic 4k.',
      visualTheme: 'Architectural Blueprint of Circularity',
      ocrSnippet: 'Table of content: The Plastic Project, Executive Summary, Background, The New Plastic Economy Challenges - Applicable to Hydromo, Approach to Problem Solving (Theoretical and Practical), SUEZ Case Study, Summary.',
    },
    {
      pageNumber: 3,
      title: 'Executive Summary',
      subtitle: 'Ellen MacArthur Foundation 2025 Vision & Hydromo',
      summary: 'The New Plastic Economy aims to transform packaging value chains via Eliminate, Innovate, and Circulate. Hydromo can pioneer solutions in water bottling plants.',
      keyFacts: [
        'Backed by Ellen MacArthur Foundation 3 key actions: Eliminate, Innovate, Circulate',
        'Secondary raw materials reduce scarcity and answer rising raw material costs',
        'Hydromo operates across Construction, Healthcare, Education, and Water Bottling',
        'Analysis structured across 3 lenses: Business Level, Product Level, Material Level'
      ],
      suggestedPrompt:
        'Cinematic tracking shot through a state-of-the-art sustainable water treatment and bottling facility, sparkling stainless steel equipment, clean water flowing through glass tubes, warm natural lighting.',
      visualTheme: 'Sustainable Industrial Plant',
      ocrSnippet: 'Launched by the Ellen MacArthur Foundation in 2016, The New Plastic Economy aims to change the global flow of plastic packaging value chain by 2025. This ambitious vision was backed by the principles of Circular Economy and 3 key actions – Eliminate, Innovate and Circulate.',
    },
    {
      pageNumber: 4,
      title: 'Background & Systemic Change',
      subtitle: 'Academic Research & Course Foundation',
      summary: 'Moving beyond incremental improvements towards systemic collaboration across governments, NGOs, and global supply chains.',
      keyFacts: [
        'Course: Circular Models & Sustainable Design, taught by Prof. Dr. Sutapa Pati',
        'Overcoming stalemates in today\'s plastic economy via extended value chain collaboration',
        'Rethinking economic and environmental outcomes simultaneously'
      ],
      suggestedPrompt:
        'Cinematic close-up of green seedlings sprouting through fertile compost soil inside a modern greenhouse, sunlight streaming through glass panels, symbolizing systemic regeneration.',
      visualTheme: 'Systemic Regeneration & Growth',
      ocrSnippet: 'The circular economy is gaining growing attention as a potential way for our society to increase prosperity, while reducing demands on finite raw materials and minimising negative externalities.',
    },
    {
      pageNumber: 5,
      title: 'The New Plastic Economy Challenges',
      subtitle: 'Fragmentation & The After-Use Opportunity',
      summary: 'Current innovation efforts are fragmented. Creating an effective after-use plastic economy is the cornerstone to capture material value and prevent environmental leakage.',
      keyFacts: [
        'Challenge 1: Fragmentation of materials, formats, labeling, and reprocessing',
        'Challenge 2: Creating an effective after-use economy as first priority',
        'Challenge 3: Most current recycling is open-loop (80% PET bottles into low-value carpets/lumber rather than closed-loop bottles)'
      ],
      suggestedPrompt:
        'Cinematic split-screen visual metaphor: left side shows tangled discarded containers, smoothly morphing on the right into organized, glistening crystal polymer beads on a conveyor, high contrast lighting.',
      visualTheme: 'Transformation from Fragmentation to Order',
      ocrSnippet: 'Creating an effective after-use plastics economy is the cornerstone of the New Plastics Economy and its first priority. Around 80% of recycled PET bottles are turned into polyester fibres for carpet, clothing... open-loop recycling today often adds just one additional use cycle.',
    },
    {
      pageNumber: 6,
      title: 'Approach to Problem Solving - The 3 Lenses',
      subtitle: 'Business, Product, and Material Levels',
      summary: 'Detailed theoretical paradigm: Business Level (economic uptake of recycling/reuse), Product Level (zero leakage into oceans), Material Level (decoupling from fossil feedstocks).',
      keyFacts: [
        'Business Level: Improve economics of recycling, reuse, and controlled biodegradation',
        'Product Level: Drastically reduce leakage of plastics into ocean ecosystems',
        'Material Level: Decouple from fossil feedstocks and dematerialize losses'
      ],
      suggestedPrompt:
        'Slow vertical tracking shot of an elegant hourglass where pristine azure ocean water and bio-polymer crystals flow together in harmony, studio lighting, hyper-detailed 4k.',
      visualTheme: 'Tri-fold Strategic Equilibrium',
      ocrSnippet: 'Theoretical – The New Way of Thinking. Business Level: Create an effective after-use plastics economy. Product Level: Drastically reduce leakage of plastics into natural systems. Material Level: Decouple plastics from fossil feedstocks.',
    },
    {
      pageNumber: 7,
      title: 'SUEZ Practical Case - Virgin-Equivalent Quality',
      subtitle: 'Near-Infrared Optical Sorting & Recovery',
      summary: 'SUEZ operational blueprint: Near-infrared optical sorting, laser sorting, electrostatic separation, hot washing, micronation, and granulation into virgin-equivalent pellets.',
      keyFacts: [
        'Near-infrared optical sorting separates polymers by chemical composition and color',
        'Advanced separation: laser, electrostatic, hot washing, micronation, granulation',
        'Outputs food-grade recycled raw materials (pellets, flakes, powder) ready for direct manufacturing'
      ],
      suggestedPrompt:
        'Cinematic macro shot of a rainbow beam of optical laser light inspecting clear polymer flakes moving on a high-speed industrial vibratory feeder, vivid light refraction, slow motion 60fps.',
      visualTheme: 'Optical Sorting Technology',
      ocrSnippet: 'SUEZ to offer recycled plastic of a quality equivalent to virgin plastic. They have a strong command of all techniques used to recycle plastics from bottles, flasks, film, technical plastics. Near-infrared optical sorting to separate plastic materials and colors.',
    },
    {
      pageNumber: 8,
      title: "Plast'lab® & The Reuse Inner Loop",
      subtitle: 'Custom Specifications & B2B/B2C Logistics',
      summary: "SUEZ's unique Plast'lab laboratory analyzes impact resistance, flexural modulus, and rheology. Reuse acts as an inner loop for structural packaging savings.",
      keyFacts: [
        'Plast\'lab® laboratory tests impact resistance, flexural modulus, rheology, heat resistance',
        'B2B reuse systems like Physical Internet unlock significant value in logistics',
        'B2C reuse driven by user-centric models and reverse logistics'
      ],
      suggestedPrompt:
        'Cinematic close-up of a robotic testing arm in a high-tech lab applying precision pressure to a transparent recycled polymer test bar, digital readouts in background, clean sci-fi documentary lighting.',
      visualTheme: 'Precision Laboratory Science',
      ocrSnippet: 'SUEZ set up the unique Plast\'lab® laboratory, based on the development of partnerships within the plastic processing industry to meet precise specifications (impact resistance, flexural modulus, rheology, heat resistance).',
    },
    {
      pageNumber: 9,
      title: 'Material Transformation Flows',
      subtitle: 'PVC, LDPE, and PP Circular Pathways',
      summary: 'Specific industrial conversion diagrams: PVC pipes into agricultural covers and fence pickets; LDPE into packaging films and irrigation pipes; PP into automotive and technical plastics.',
      keyFacts: [
        'Polyvinyl Chloride (PVC): Offcuts, pipes, credit cards -> agriculture covers, gutters, building profiles',
        'Low-Density Polyethylene (LDPE): Agricultural post-consumer films -> waste bags, irrigation pipes, packaging films',
        'Polypropylene (PP): Industrial production & post-consumer waste -> automotive parts, construction commodities, technical plastics'
      ],
      suggestedPrompt:
        'Cinematic tracking shot through a modern automotive assembly line where sleek interior dashboard components made from recycled dark polymers are installed by robotic arms, sparks and volumetric light.',
      visualTheme: 'Industrial High-Value Manufacturing',
      ocrSnippet: 'From PVC pipes to agriculture covers; From LDPE films to irrigation pipes and packaging films; From PP post-consumer waste to automotive, construction, and technical packaging.',
    },
    {
      pageNumber: 10,
      title: 'Economic Costs & Global Horizon',
      subtitle: 'The $80–120 Billion Packaging Value Opportunity',
      summary: '95% of plastic packaging value ($80–120B annually) is currently lost after short first-use. UNEP estimates $40B in after-use externalities. Transforming this creates immense economic potential.',
      keyFacts: [
        '95% of plastic packaging value ($80–120 billion/year) is lost to the economy after short first use',
        '32% of plastic packaging escapes collection systems completely',
        'UNEP conservatively estimates $40 billion in after-use externalities and greenhouse emissions',
        'Enhancing system effectiveness captures this lost value while preserving planetary capital'
      ],
      suggestedPrompt:
        'Cinematic wide shot of a bustling, sustainable coastal eco-city powered by green energy, with clean waterways, modern electric transport, and lush green rooftop gardens under a clear sunny sky.',
      visualTheme: 'Sustainable Economic Prosperity',
      ocrSnippet: 'Summary: After a short first-use cycle, 95% of plastic packaging material value, or USD 80–120 billion annually, is lost to the economy. A staggering 32% escapes collection systems. UNEP estimates $40 billion in externalities.',
    },
    {
      pageNumber: 11,
      title: 'Academic & Industry References',
      subtitle: 'Ellen MacArthur Foundation, McKinsey & SUEZ',
      summary: 'Authoritative citations and sources grounding the research in global sustainability benchmarks.',
      keyFacts: [
        'Ellen MacArthur Foundation - The New Plastics Economy',
        'McKinsey Sustainability Reports',
        'SUEZ Resources Management Consulting & Alliance to End Plastic Waste',
        'Hydromo Water Infrastructure & Technologies'
      ],
      suggestedPrompt:
        'Warm cinematic macro shot of an open academic research notebook with handwritten notes on circular economy, sitting beside a sleek stainless steel reusable water bottle on a warm oak desk.',
      visualTheme: 'Academic Rigor & Dedication',
      ocrSnippet: 'References: Ellen MacArthur Foundation, SUEZ Alliance to End Plastic Waste, SUEZ Transforming Waste into Secondary Raw Materials, Hydromo.in, McKinsey Sustainability Report.',
    }
  ]
};
