import React from 'react';
import { RfpData } from '../types';
import { DELIVERABLES_LIST, COMMERCIAL_TERMS_LIST } from '../constants';

interface WordCopyPreviewProps {
    data: RfpData;
}

const formatDateTime = (dateString: string) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) return 'Not specified';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const formatDateOnly = (dateString: string) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) return 'TBD';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const styles = {
    container: { fontFamily: 'Calibri, Arial, sans-serif', fontSize: '11pt', color: '#333333', lineHeight: '1.5' },
    header: { textAlign: 'center' as const, marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid black' },
    pHeader: { fontSize: '14pt', color: '#555555', margin: '0 0 4px 0' },
    h1: { fontSize: '22pt', fontWeight: 'bold', color: '#000000', margin: '0 0 8px 0' },
    pSubHeader: { fontSize: '12pt', color: '#333333', margin: '4px 0 0 0' },
    section: { marginBottom: '32px' },
    sectionTitle: { fontSize: '18pt', fontWeight: 'bold', color: '#000000', paddingBottom: '4px', marginBottom: '12px', borderBottom: '1px solid black' },
    subSectionTitle: { fontSize: '14pt', fontWeight: 'bold', color: '#000000', paddingBottom: '4px', marginBottom: '12px', borderBottom: '1px solid #cccccc' },
    subSubSectionTitle: { fontSize: '12pt', fontWeight: 'bold', color: '#1F4E79', marginBottom: '8px' },
    p: { margin: '0 0 12px 0', whiteSpace: 'pre-wrap' as const, wordWrap: 'break-word' as const },
    list: { margin: '0 0 12px 20px', paddingLeft: '20px' },
    listItem: { marginBottom: '4px' },
    table: { width: '100%', borderCollapse: 'collapse' as const, marginBottom: '12px' },
    th: { borderBottom: '1.5px solid black', padding: '8px', textAlign: 'left' as const, fontWeight: 'bold' },
    td: { borderBottom: '1px solid #dddddd', padding: '8px' },
    inlineHeading: { fontSize: '12pt', fontWeight: 'bold', color: '#000000', marginTop: '24px', marginBottom: '12px', borderBottom: '1px solid #cccccc', paddingBottom: '4px' },
    note: { fontStyle: 'italic', fontSize: '10pt', color: '#555555', marginTop: '8px' },
    evalDetail: { marginTop: '8px', padding: '8px', backgroundColor: '#f2f2f2', borderLeft: '3px solid #cccccc', fontFamily: 'Courier New, monospace', fontSize: '9pt', whiteSpace: 'pre-wrap' as const }
};

export const WordCopyPreview: React.FC<WordCopyPreviewProps> = ({ data }) => {
    const evaluationCriteria = [
        { name: 'technicalFeasibility', title: 'Technical Feasibility', points: ['Proven technology and operational experience', 'Compliance with technical requirements'] },
        { name: 'references', title: 'References', points: ['List of similar projects and client testimonials'] },
        { name: 'cost', title: 'Cost', points: ['Total installed cost estimate', 'Operating and maintenance cost projections'] },
        { name: 'scheduleAdherence', title: 'Schedule Adherence', points: ['Proposed project execution timeline', 'Demonstrated ability to meet project milestones'] },
        { name: 'esg', title: 'ESG Considerations', points: ['Environmental impact assessment', 'Social and governance policies'] },
    ] as const;

    return (
        <div>
            <div style={{ border: '2px dashed #ccc', padding: '16px', backgroundColor: '#f9f9f9', marginBottom: '24px', fontFamily: 'sans-serif' }}>
                <h3 style={{ marginTop: '0', fontSize: '14pt', fontWeight: 'bold' }}>How to use this view:</h3>
                <p>1. Press <strong>Ctrl+A</strong> (or <strong>Cmd+A</strong> on Mac) to select all the content below.</p>
                <p>2. Press <strong>Ctrl+C</strong> (or <strong>Cmd+C</strong>) to copy it.</p>
                <p style={{ marginBottom: '0' }}>3. Open a new Microsoft Word document and press <strong>Ctrl+V</strong> (or <strong>Cmd+V</strong>) to paste.</p>
            </div>
            <div id="word-content-area" style={styles.container}>
                <header style={styles.header}>
                    <p style={styles.pHeader}>Request for Proposal (RFP)</p>
                    <h1 style={styles.h1}>{data.projectName}</h1>
                    <p style={styles.pSubHeader}>Issued by: {data.companyName}</p>
                    <p style={styles.pSubHeader}>CO₂ Capture Capacity Target: <strong>{data.co2CaptureCapacity || 'N/A'} TPD</strong></p>
                </header>
                <main>
                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>1. Introduction</h2>
                        <p style={styles.p}>{data.introduction || 'Not provided.'}</p>
                    </section>
                    
                    {data.abbreviations && data.abbreviations.length > 0 && (
                        <section style={styles.section}>
                            <h2 style={styles.sectionTitle}>2. Abbreviations</h2>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={{...styles.th, width: '25%'}}>Abbreviation</th>
                                        <th style={styles.th}>Full Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.abbreviations.map(abbr => (
                                        <tr key={abbr.id}>
                                            <td style={styles.td}><strong>{abbr.abbr}</strong></td>
                                            <td style={styles.td}>{abbr.fullName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    )}

                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>3. Scope of Work (SOW)</h2>
                        <p style={styles.p}>{data.scopeOfWork || 'Not provided.'}</p>
                        
                        {data.blockFlowDiagram && (
                            <div style={{ pageBreakInside: 'avoid' }}>
                                <h3 style={styles.inlineHeading}>Block Flow Diagram</h3>
                                <img src={data.blockFlowDiagram} alt="Block Flow Diagram" style={{ maxWidth: '100%', border: '1px solid #cccccc', borderRadius: '4px' }} />
                            </div>
                        )}

                        <h3 style={styles.inlineHeading}>Feed Gas Composition</h3>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{...styles.th, width: '50%'}}>Description</th>
                                    <th style={styles.th}>Unit</th>
                                    <th style={styles.th}>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.feedstocks.map(f => {
                                    if (f.type === 'spacer') return <tr key={f.id}><td colSpan={3} style={{...styles.td, padding: '4px', backgroundColor: '#f2f2f2', border: 0}}></td></tr>;
                                    if (f.type === 'header') return <tr key={f.id}><td colSpan={3} style={{...styles.td, paddingTop: '12px', fontWeight: 'bold'}}>{f.description}</td></tr>;
                                    return (
                                        <tr key={f.id}>
                                            <td style={{...styles.td, paddingLeft: f.isSubItem ? '24px' : '8px'}}>{f.description}</td>
                                            <td style={styles.td}>{f.unit}</td>
                                            <td style={{...styles.td, fontFamily: 'Courier New, monospace'}}>{f.value}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <p style={styles.note}>Note: Licensor shall provide the feedstock contamintants limitations of CO2 capturing unit.</p>
                        
                        <h3 style={styles.inlineHeading}>Utility Supply Condition</h3>
                        <p style={styles.p}>The design of the unit shall be based on available utilities and off-sites. All utilities, off-sites, and their properties and battery limit specifications are described in the design basis. The following utilities will be available:</p>
                        <ul style={styles.list}>
                            {data.utilities.filter(u => u.selected).map(u => (
                                <li key={u.id} style={styles.listItem}>
                                    <strong>{u.name}:</strong> {u.condition}
                                </li>
                            ))}
                            {data.utilities.filter(u => u.selected).length === 0 && <p style={styles.note}>No specific utilities selected.</p>}
                        </ul>

                        <h3 style={styles.inlineHeading}>Emission and Waste Treatment Requirements</h3>
                        <p style={styles.p}>{data.emissionRequirements || 'Not provided.'}</p>
                    </section>

                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>4. Design Requirements</h2>
                        <ul style={{ ...styles.list, listStyleType: 'none', paddingLeft: 0 }}>
                            <li style={{...styles.listItem, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}><span><strong>Min. CO₂ Capture Efficiency:</strong></span> <span>{data.techReqs.captureEfficiency || 'N/A'} %</span></li>
                            <li style={{...styles.listItem, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}><span><strong>Min. CO₂ Product Purity:</strong></span> <span>{data.techReqs.productPurity || 'N/A'} %</span></li>
                            <li style={{...styles.listItem, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}><span><strong>Plant Operational Lifetime:</strong></span> <span>{data.techReqs.lifetime || 'N/A'} years</span></li>
                            <li style={{...styles.listItem, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}><span><strong>Flexibility (Turndown Ratio):</strong></span> <span>{data.techReqs.turndownRatio || 'N/A'} %</span></li>
                        </ul>
                    </section>
                    
                    <section style={styles.section}>
                        <h2 style={styles.sectionTitle}>5. Proposal Requirements</h2>
                        <div style={{ pageBreakInside: 'avoid' }}>
                            <h3 style={styles.subSectionTitle}>5.1. Deliverables</h3>
                            <ul style={{...styles.list, columns: 2}}>
                                {DELIVERABLES_LIST.filter(item => data.deliverables[item]).map(item => <li key={item} style={styles.listItem}>{item}</li>)}
                            </ul>
                        </div>
                        <div style={{ pageBreakInside: 'avoid' }}>
                            <h3 style={styles.subSectionTitle}>5.2. Submission & Evaluation</h3>
                            <h4 style={styles.subSubSectionTitle}>Submission Instructions</h4>
                            <ul style={{ ...styles.list, listStyleType: 'none', paddingLeft: 0 }}>
                                <li style={styles.listItem}><strong>Format:</strong> {data.submission.submissionFormat || 'Not specified'}</li>
                                <li style={styles.listItem}><strong>Contact:</strong> {data.submission.contactPerson || 'Not specified'} ({data.submission.contactEmail || 'N/A'}, {data.submission.phone || 'N/A'})</li>
                                <li style={styles.listItem}><strong>Deadline:</strong> {formatDateTime(data.submission.deadline)}</li>
                            </ul>
                            <h4 style={styles.subSubSectionTitle}>Proposal Formatting</h4>
                            <p style={styles.p}>Proposals shall be submitted in two separate parts: a technical proposal and a commercial proposal.</p>
                            <h4 style={styles.subSubSectionTitle}>Evaluation Metrics</h4>
                            {evaluationCriteria.map(metric => (
                                <div key={metric.name} style={{ marginBottom: '16px' }}>
                                    <h5 style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>{metric.title}</h5>
                                    <ul style={{ ...styles.list, margin: '0 0 8px 20px' }}>
                                        {metric.points.map(p => <li key={p} style={styles.listItem}>{p}</li>)}
                                    </ul>
                                    {data.evaluationMetrics[metric.name] && <div style={styles.evalDetail}>{data.evaluationMetrics[metric.name]}</div>}
                                </div>
                            ))}
                        </div>
                        <div style={{ pageBreakInside: 'avoid' }}>
                            <h3 style={styles.subSectionTitle}>5.3. Project Timeline & Milestones</h3>
                             <ul style={{ ...styles.list, listStyleType: 'none', paddingLeft: 0 }}>
                                <li style={{...styles.listItem, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}><strong>Proposal Submission Deadline:</strong> <span>{formatDateOnly(data.timeline.submissionDeadline)}</span></li>
                                <li style={{...styles.listItem, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}><strong>Final Selection & Contract Award:</strong> <span>{formatDateOnly(data.timeline.contractAward)}</span></li>
                                <li style={{...styles.listItem, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}><strong>Technical Clarification Period:</strong> <span>{data.timeline.clarificationPeriod || 'N/A'} weeks</span></li>
                                <li style={{...styles.listItem, display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}><strong>Evaluation & Shortlisting:</strong> <span>{data.timeline.evaluationPeriod || 'N/A'} weeks</span></li>
                            </ul>
                        </div>
                        <div style={{ pageBreakInside: 'avoid' }}>
                            <h3 style={styles.subSectionTitle}>5.4. Commercial Terms</h3>
                            <p style={styles.p}>Commercial Proposal will consist of the following as a minimum:</p>
                            <ul style={styles.list}>
                                {COMMERCIAL_TERMS_LIST.filter(item => data.commercialTerms[item]).map(item => <li key={item} style={styles.listItem}>{item}</li>)}
                            </ul>
                        </div>
                        <div style={{ pageBreakInside: 'avoid' }}>
                            <h3 style={styles.subSectionTitle}>5.5. Annexes & Q&A</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div><h5 style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>Annex A: Feed Gas Specifications</h5><p style={styles.p}>{data.annexes.a}</p></div>
                                <div><h5 style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>Annex B: Design Basis Document</h5><p style={styles.p}>{data.annexes.b}</p></div>
                                <div><h5 style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>Annex C: Sample Contract Terms</h5><p style={styles.p}>{data.annexes.c}</p></div>
                                <div><h5 style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>Annex D: Proposal Submission Template</h5><p style={styles.p}>{data.annexes.d}</p></div>
                                <div style={{ paddingTop: '16px' }}><h5 style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>Q&A Process</h5><p style={styles.p}>{data.qa}</p></div>
                            </div>
                        </div>
                    </section>
                </main>
                 <footer style={{ marginTop: '24px', paddingTop: '12px', borderTop: '1px solid #cccccc', textAlign: 'center', fontSize: '9pt', color: '#777777' }}>
                    <p>End of Document</p>
                </footer>
            </div>
        </div>
    );
};
