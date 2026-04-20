"use client";

import Papa from 'papaparse';

export default function ExportButton({ data }: { data: any[] }) {
  const handleExport = () => {
    if (data.length === 0) {
      alert("No data to export");
      return;
    }
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `cics_alumni_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={handleExport}
      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1A3626] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#12261a] transition-all shadow-md"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
      Export {data.length} Records
    </button>
  );
}
