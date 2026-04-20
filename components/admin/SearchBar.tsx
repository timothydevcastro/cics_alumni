import { Input } from "@/components/ui/input";

export default function SearchBar({ value, onChange }: { value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative w-full">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <Input 
        type="text" 
        placeholder="Search by name, ID, or course..." 
        className="bg-white pl-10 border-gray-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
