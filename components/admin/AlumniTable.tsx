"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function AlumniTable({ data }: { data: any[] }) {
  const [selectedAlumni, setSelectedAlumni] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (alumni: any) => {
    setSelectedAlumni(alumni);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-white/50 border-b border-gray-100">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-bold text-[#1A3626] py-4">Student ID</TableHead>
            <TableHead className="font-bold text-[#1A3626]">Name</TableHead>
            <TableHead className="font-bold text-[#1A3626]">Course</TableHead>
            <TableHead className="font-bold text-[#1A3626]">Batch</TableHead>
            <TableHead className="font-bold text-[#1A3626]">Employment Status</TableHead>
            <TableHead className="text-right font-bold text-[#1A3626] pr-8">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((alumni) => (
              <TableRow key={alumni.id} className="hover:bg-white/50 transition-colors border-b border-gray-50 last:border-0">
                <TableCell className="font-semibold text-[#2D332F]">{alumni.id}</TableCell>
                <TableCell>{alumni.firstName} {alumni.lastName}</TableCell>
                <TableCell className="text-gray-600">{alumni.course}</TableCell>
                <TableCell>{alumni.batchYear}</TableCell>
                <TableCell>
                  <Badge 
                    className={`
                      ${alumni.employmentStatus === 'Employed' ? 'bg-[#1A3626] hover:bg-[#1A3626]' : ''}
                      ${alumni.employmentStatus === 'OFW' ? 'bg-[#2D332F] hover:bg-[#2D332F]' : ''}
                      ${alumni.employmentStatus === 'Unemployed' ? 'bg-red-600 hover:bg-red-600' : ''}
                      ${alumni.employmentStatus === 'Self-Employed' ? 'bg-gray-100 text-gray-800 hover:bg-gray-100' : ''}
                      rounded-full px-3 py-0.5 font-medium
                    `}
                  >
                    {alumni.employmentStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-8">
                  <button 
                    onClick={() => handleViewDetails(alumni)}
                    className="text-sm font-bold text-[#1A3626] hover:underline underline-offset-4"
                  >
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-48 text-center text-gray-400 font-medium italic">
                No records found matching your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-[#F5F2EB] border-none p-0 overflow-hidden rounded-3xl">
          <ScrollArea className="max-h-[85vh]">
            <div className="p-8">
              <DialogHeader className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <Badge className="bg-[#1A3626]">{selectedAlumni?.id}</Badge>
                  <Badge variant="outline" className="border-[#1A3626] text-[#1A3626]">{selectedAlumni?.batchYear}</Badge>
                </div>
                <DialogTitle className="font-serif text-3xl font-bold text-[#1A3626]">
                  {selectedAlumni?.firstName} {selectedAlumni?.middleName} {selectedAlumni?.lastName}
                </DialogTitle>
                <DialogDescription className="text-gray-600 font-medium">
                  {selectedAlumni?.course}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Personal Details</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div>
                      <p className="text-gray-500 mb-0.5">Sex</p>
                      <p className="font-bold text-[#2D332F]">{selectedAlumni?.sex}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-0.5">Civil Status</p>
                      <p className="font-bold text-[#2D332F]">{selectedAlumni?.civilStatus}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-0.5">Date of Birth</p>
                      <p className="font-bold text-[#2D332F]">{selectedAlumni?.dateOfBirth}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-0.5">Contact Number</p>
                      <p className="font-bold text-[#2D332F]">{selectedAlumni?.contactNumber}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500 mb-0.5">Personal Email</p>
                      <p className="font-bold text-[#2D332F]">{selectedAlumni?.personalEmail}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500 mb-0.5">Home Address</p>
                      <p className="font-bold text-[#2D332F]">{selectedAlumni?.homeAddress}</p>
                    </div>
                  </div>
                </section>

                <Separator className="bg-gray-200" />

                <section>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Employment Details</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div>
                      <p className="text-gray-500 mb-0.5">Current Status</p>
                      <p className="font-bold text-[#2D332F]">{selectedAlumni?.employmentStatus}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-0.5">Type</p>
                      <p className="font-bold text-[#2D332F]">{selectedAlumni?.employmentType}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500 mb-0.5">Company</p>
                      <p className="font-bold text-[#2D332F]">{selectedAlumni?.currentCompany}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-0.5">Position</p>
                      <p className="font-bold text-[#2D332F]">{selectedAlumni?.jobTitle}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-0.5">Years in Company</p>
                      <p className="font-bold text-[#2D332F]">{selectedAlumni?.yearsInCompany}</p>
                    </div>
                    {selectedAlumni?.employmentStatus === 'OFW' && (
                      <>
                        <div>
                          <p className="text-gray-500 mb-0.5">Country Based</p>
                          <p className="font-bold text-[#2D332F]">{selectedAlumni?.countryBased}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-0.5">Visa Type</p>
                          <p className="font-bold text-[#2D332F]">{selectedAlumni?.visaType}</p>
                        </div>
                      </>
                    )}
                  </div>
                </section>

                <Separator className="bg-gray-200" />

                <section className="pb-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Social & Engagement</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                      <span className="text-gray-600 font-medium">LinkedIn Profile</span>
                      {selectedAlumni?.linkedinUrl ? (
                        <a href={selectedAlumni.linkedinUrl} target="_blank" className="text-[#1A3626] font-bold hover:underline">View Profile</a>
                      ) : (
                        <span className="text-gray-400">Not provided</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                      <span className="text-gray-600 font-medium">Willing to be Speaker</span>
                      <Badge className={selectedAlumni?.willingToBeSpeaker === 'Yes' ? 'bg-green-600' : 'bg-gray-400'}>
                        {selectedAlumni?.willingToBeSpeaker}
                      </Badge>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
