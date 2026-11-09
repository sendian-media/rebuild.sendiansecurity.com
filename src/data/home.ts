const assets = '/sites/sendiansecurity-com/home';

export const home = {
  hero: {
    image: `${assets}/about/about-siss.png`,
  },
  metrics: [
    ['250+', 'Projects delivered'],
    ['10,000+', 'Devices deployed'],
    ['24/7', 'Operational support'],
    ['750M+', 'QAR value delivered'],
  ],
  solutions: [
    { number: '01', title: 'Security &\nsurveillance', description: 'CCTV, access control and integrated protection.', image: `${assets}/services/security-surveillance.jpg` },
    { number: '02', title: 'Infrastructure &\ndata centers', description: 'Reliable data infrastructure, built to scale.', image: `${assets}/services/infrastructure-data-center.png` },
    { number: '03', title: 'Parking &\nmobility', description: 'Connected systems for controlled, efficient access.', image: `${assets}/services/parking-mobility.png` },
    { number: '04', title: 'Communication &\nnetworks', description: 'Secure networking and unified communication.', image: `${assets}/services/communication-network.png` },
  ],
  steps: [
    { title: 'Consult', description: 'Requirements gathering, site audit and threat-aware scope definition.' },
    { title: 'Design', description: 'System architecture, camera coverage and access plans' },
    { title: 'Deploy', description: 'In-house engineers handle supply, installation, racking and network setup.' },
    { title: 'Commission', description: 'Full system testing, live handover demo and as-built documentation.' },
    { title: 'Maintain', description: 'AMC, remote monitoring and 24/7 response — the same team that built it.' },
  ],
  credentials: [
    { image: `${assets}/trust/moi-approved.png`, text: 'MOI-approved contractor' },
    { image: `${assets}/trust/iso-certified.png`, text: 'ISO-certified operations' },
    { image: `${assets}/trust/cisco-certified.png`, text: 'Cisco networking expertise' },
  ],
  certificates: [
    { name: 'ISO 9001:2015', description: 'Quality Management System', image: 'iso-9001-2015.png' },
    { name: 'ISO 14001:2015', description: 'Environmental Management System', image: 'iso-14001-2015.png' },
    { name: 'ISO 22301:2019', description: 'Business Continuity Management System', image: 'iso-22301-2019.png' },
    { name: 'ISO 41001:2018', description: 'Facility Management System', image: 'iso-41001-2018.png' },
    { name: 'ISO 45001:2018', description: 'Occupational Health and Safety Management System', image: 'iso-45001-2018.png' },
  ],
  projects: [
    { name: 'Ghanem Office Building', image: `${assets}/projects/ghanem-office-building.jpg` },
    { name: 'MARINA MIX 52', image: `${assets}/projects/marina-mix-52.png` },
    { name: 'Gulf Warehousing Company', image: `${assets}/projects/gulf-warehousing-company.jpg` },
  ],
};
