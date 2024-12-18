import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminJobsTable() {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                   job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
        });

        setFilterJobs(filteredCompany);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="overflow-x-auto min-h-[60vh] bg-gray-50 rounded-lg shadow-md p-4 sm:p-6">
            <Table className="w-full text-left text-gray-700 bg-white rounded-lg shadow-md">
                <TableCaption className="text-sm text-gray-600 font-medium py-3 bg-gray-100 border-b border-gray-200">
                    A list of your recent Posted Jobs
                </TableCaption>
                <TableHeader className="bg-teal-400">
                    <TableRow>
                        <TableHead className="py-4 px-4 text-black sm:px-6">Company Name</TableHead>
                        <TableHead className="py-4 px-4 text-black sm:px-6">Role</TableHead>
                        <TableHead className="py-4 px-4 text-black sm:px-6">Date</TableHead>
                        <TableHead className="py-4 px-4 text-black sm:px-6 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.length > 0 ? (
                        filterJobs.map((job) => (
                            <TableRow key={job._id} className="hover:bg-gray-100 transition ease-in-out">
                                <TableCell className="py-3 px-4 sm:px-6 font-medium text-black">
                                    {job?.company?.name}
                                </TableCell>
                                <TableCell className="py-3 px-4 sm:px-6 font-medium text-black">
                                    {job?.title}
                                </TableCell>
                                <TableCell className="py-3 px-4 sm:px-6 text-black">
                                    {job?.createdAt?.split("T")[0]}
                                </TableCell>
                                <TableCell className="py-3 px-4 sm:px-6 text-right cursor-pointer">
                                    <div className="flex justify-end">
                                        <Popover>
                                            <PopoverTrigger className="flex items-center justify-end">
                                                <MoreHorizontal className="w-6 h-6 text-black hover:text-indigo-600 transition" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-40 p-2 bg-white rounded-md shadow-lg border border-gray-200">
                                                <div
                                                    onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                    className="flex items-center gap-2 px-3 py-2 hover:bg-indigo-100 rounded cursor-pointer text-gray-700 transition"
                                                >
                                                    <Edit2 className="w-4 text-indigo-600" />
                                                    <span className="text-sm">Edit</span>
                                                </div>
                                                <div
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                    className="flex items-center gap-2 px-3 py-2 hover:bg-indigo-100 rounded cursor-pointer text-gray-700 transition mt-2"
                                                >
                                                    <Eye className="w-4 text-indigo-600" />
                                                    <span className="text-sm">Applicants</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center py-4">
                                You haven&apos;t registered any company yet!
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default AdminJobsTable;
