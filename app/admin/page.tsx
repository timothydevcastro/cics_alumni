"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import AlumniTable from '@/components/admin/AlumniTable';
import SearchBar from '@/components/admin/SearchBar';
import FilterPanel from '@/components/admin/FilterPanel';
import ExportButton from '@/components/admin/ExportButton';

import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [alumniData, setAlumniData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [batchFilter, setBatchFilter] = useState('All');

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/alumni');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setAlumniData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return alumniData.filter(item => {
      const matchesSearch = 
        (item.firstName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (item.lastName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (item.id?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (item.course?.toLowerCase() || "").includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || item.employmentStatus === statusFilter;
      const matchesCourse = courseFilter === 'All' || item.course === courseFilter;
      const matchesBatch = batchFilter === 'All' || item.batchYear === batchFilter;

      return matchesSearch && matchesStatus && matchesCourse && matchesBatch;
    });
  }, [alumniData, searchQuery, statusFilter, courseFilter, batchFilter]);

  return (
    <div className="min-h-screen bg-[#F5F2EB] font-sans text-[#2D332F]">
      {/* Admin Header */}
      <div className="bg-[#1A3626] text-white py-6 px-6 md:px-12 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <Image src="/logo_cics.png" alt="CICS Logo" width={48} height={48} className="rounded-md brightness-0 invert" />
          <div>
            <h1 className="font-serif text-xl md:text-2xl font-bold leading-tight">CICS Admin Portal</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-80 font-bold">Alumni Records Management</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none mb-1">Faculty Admin</p>
            <button 
              onClick={handleLogout}
              className="text-[10px] opacity-60 uppercase font-bold hover:opacity-100 hover:text-red-400 transition-all text-left block"
            >
              Sign Out
            </button>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold border border-white/20">
            FA
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Controls Row */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 flex-1">
            <div className="w-full lg:max-w-xs">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <FilterPanel 
              status={statusFilter} onStatusChange={setStatusFilter}
              course={courseFilter} onCourseChange={setCourseFilter}
              batch={batchFilter} onBatchChange={setBatchFilter}
            />
          </div>
          <div className="flex items-center gap-3">
            <ExportButton data={filteredData} />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E8E4D9] overflow-hidden min-h-[400px] flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-20 text-gray-400">
              <div className="w-10 h-10 border-4 border-[#1A3626]/20 border-t-[#1A3626] rounded-full animate-spin mb-4"></div>
              <p className="font-bold text-sm tracking-widest uppercase">Fetching Alumni Records...</p>
            </div>
          ) : error ? (
            <div className="flex-1 flex flex-col items-center justify-center p-20 text-red-400">
              <p className="font-bold text-sm tracking-widest uppercase mb-2">Error Loading Data</p>
              <p className="text-xs opacity-70">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-[#1A3626] text-white rounded-xl text-xs font-bold"
              >
                Retry
              </button>
            </div>
          ) : alumniData.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-20 text-gray-400">
              <p className="font-bold text-sm tracking-widest uppercase">No Records Found</p>
            </div>
          ) : (
            <div className="p-1">
              <AlumniTable data={filteredData} />
            </div>
          )}
        </div>
        
        {/* Footer info */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
          <p className="text-xs text-gray-500 font-bold tracking-wide uppercase">
            Showing {filteredData.length} of {alumniData.length} alumni records
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-400 cursor-not-allowed shadow-sm" disabled>Previous</button>
            <button className="px-4 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#1A3626] hover:bg-gray-50 shadow-sm transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
