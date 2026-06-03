import type { Document } from '@/types/common.types'

export const dummyDocuments: Document[] = [
  // Floorplans
  {
    id: 'doc_001', investorId: 'inv_michael_anderson_001', projectId: 'proj_seminyak_001',
    category: 'floorplans', name: 'Seminyak Residences V12 — Floor Plan (Level 1 & 2)',
    fileName: 'SEM-V12-FloorPlan-L1L2-Rev3.pdf', fileType: 'PDF', fileSize: 4820000,
    downloadUrl: '#', uploadedAt: '2023-10-05', uploadedBy: 'XYZ Design Studio',
    description: 'Approved architectural floor plans for Villa 12 at Seminyak Residences, Revision 3.',
  },
  {
    id: 'doc_002', investorId: 'inv_michael_anderson_001', projectId: 'proj_uluwatu_002',
    category: 'floorplans', name: 'Uluwatu Ocean Villas B03 — As-Built Floor Plan',
    fileName: 'ULU-B03-AsBuilt-FloorPlan-Final.pdf', fileType: 'PDF', fileSize: 6340000,
    downloadUrl: '#', uploadedAt: '2025-06-20', uploadedBy: 'XYZ Design Studio',
    description: 'Final as-built floor plan for Villa B03, issued post-completion.',
  },
  {
    id: 'doc_003', investorId: 'inv_michael_anderson_001', projectId: 'proj_canggu_003',
    category: 'floorplans', name: 'Canggu Smart Villas A17 — Preliminary Design Plan',
    fileName: 'CAN-A17-PrelimDesign-Rev1.pdf', fileType: 'PDF', fileSize: 3120000,
    downloadUrl: '#', uploadedAt: '2024-03-14', uploadedBy: 'XYZ Design Studio',
    description: 'Preliminary design drawings for Canggu Smart Villas Unit A17.',
  },
  // Contracts
  {
    id: 'doc_004', investorId: 'inv_michael_anderson_001', projectId: 'proj_seminyak_001',
    category: 'contracts', name: 'Seminyak Residences — Sale & Purchase Agreement',
    fileName: 'SEM-V12-SPA-Signed-20230815.pdf', fileType: 'PDF', fileSize: 2150000,
    downloadUrl: '#', uploadedAt: '2023-08-15', uploadedBy: 'XYZ Properties Legal',
    description: 'Signed Sale and Purchase Agreement for Seminyak Residences V12.',
  },
  {
    id: 'doc_005', investorId: 'inv_michael_anderson_001', projectId: 'proj_uluwatu_002',
    category: 'contracts', name: 'Uluwatu Ocean Villas — Sale & Purchase Agreement',
    fileName: 'ULU-B03-SPA-Signed-20230320.pdf', fileType: 'PDF', fileSize: 2380000,
    downloadUrl: '#', uploadedAt: '2023-03-20', uploadedBy: 'XYZ Properties Legal',
    description: 'Signed Sale and Purchase Agreement for Uluwatu Ocean Villas B03.',
  },
  {
    id: 'doc_006', investorId: 'inv_michael_anderson_001', projectId: 'proj_uluwatu_002',
    category: 'contracts', name: 'Uluwatu Ocean Villas — Rental Management Agreement',
    fileName: 'ULU-B03-RMA-20250620.pdf', fileType: 'PDF', fileSize: 1870000,
    downloadUrl: '#', uploadedAt: '2025-06-20', uploadedBy: 'XYZ Properties Management',
    description: 'Rental Management Agreement — 3-year term from June 2025.',
  },
  // Legal
  {
    id: 'doc_007', investorId: 'inv_michael_anderson_001', projectId: 'proj_uluwatu_002',
    category: 'legal', name: 'Uluwatu Ocean Villas B03 — Strata Title Certificate',
    fileName: 'ULU-B03-StrataTitle-Cert-2026.pdf', fileType: 'PDF', fileSize: 890000,
    downloadUrl: '#', uploadedAt: '2026-05-20', uploadedBy: 'Badan Pertanahan Nasional',
    description: 'Official Strata Title Certificate (Sertifikat Hak Milik) for Uluwatu Ocean Villas B03.',
  },
  {
    id: 'doc_008', investorId: 'inv_michael_anderson_001', projectId: 'proj_seminyak_001',
    category: 'legal', name: 'Seminyak Residences — IMB Building Permit',
    fileName: 'SEM-IMB-Permit-2024.pdf', fileType: 'PDF', fileSize: 1240000,
    downloadUrl: '#', uploadedAt: '2024-01-30', uploadedBy: 'Dinas PUPR Badung',
    description: 'Izin Mendirikan Bangunan (Building Permit) for Seminyak Residences.',
  },
  // Marketing Collateral
  {
    id: 'doc_009', investorId: 'inv_michael_anderson_001', projectId: 'proj_seminyak_001',
    category: 'marketing', name: 'Seminyak Residences — Investor Brochure 2025',
    fileName: 'SEM-InvestorBrochure-2025.pdf', fileType: 'PDF', fileSize: 18500000,
    downloadUrl: '#', uploadedAt: '2025-01-10', uploadedBy: 'XYZ Marketing Team',
    description: 'Full investor brochure including ROI projections, rental yield history, and property specifications.',
  },
  {
    id: 'doc_010', investorId: 'inv_michael_anderson_001', projectId: 'proj_canggu_003',
    category: 'marketing', name: 'Canggu Smart Villas — Project Prospectus',
    fileName: 'CAN-ProjectProspectus-2024.pdf', fileType: 'PDF', fileSize: 12200000,
    downloadUrl: '#', uploadedAt: '2024-02-05', uploadedBy: 'XYZ Marketing Team',
    description: 'Comprehensive project prospectus including smart home specifications and rental management terms.',
  },
]
