import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CONSTANTS } from "@/lib/constants";

export default function FilterPanel({ 
  status, onStatusChange, 
  course, onCourseChange, 
  batch, onBatchChange 
}: any) {
  return (
    <div className="flex flex-wrap gap-3">
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[140px] md:w-[180px] bg-white border-gray-200">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Statuses</SelectItem>
          {CONSTANTS.EMPLOYMENT_STATUS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={course} onValueChange={onCourseChange}>
        <SelectTrigger className="w-[140px] md:w-[180px] bg-white border-gray-200">
          <SelectValue placeholder="Course" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Courses</SelectItem>
          {CONSTANTS.COURSES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={batch} onValueChange={onBatchChange}>
        <SelectTrigger className="w-[100px] md:w-[140px] bg-white border-gray-200">
          <SelectValue placeholder="Batch" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Batches</SelectItem>
          {['2024', '2023', '2022', '2021', '2020'].map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}
