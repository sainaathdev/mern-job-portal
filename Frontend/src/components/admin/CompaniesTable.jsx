import { Edit2, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"



function CompaniesTable() {
    const {companies, searchCompanyByText} = useSelector(store => store.company)
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate()

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        }) 
        setFilterCompany(filteredCompany);
    },[companies, searchCompanyByText])
  return (
    <div className="overflow-x-auto min-h-[60vh] bg-gray-50 rounded-lg shadow-md p-4 sm:p-6">
            <Table className="w-full text-left text-gray-700 bg-white rounded-lg shadow-md">
                <TableCaption className="text-sm text-gray-600 font-medium py-3 bg-gray-100 border-b border-gray-200">
                    A list of your recent registered companies
                </TableCaption>
                
                <TableHeader className="bg-teal-400 ">
                    <TableRow>
                        <TableHead className="py-4 px-4 text-black sm:px-6">Logo</TableHead>
                        <TableHead className="py-4 px-4 text-black sm:px-6">Name</TableHead>
                        <TableHead className="py-4 px-4 text-black sm:px-6">Date</TableHead>
                        <TableHead className="py-4 px-4 text-black sm:px-6 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                
                <TableBody>
                    {companies && companies.length > 0 ? (
                        filterCompany.map((company) => (
                            <TableRow key={company._id} className="hover:bg-gray-100 transition ease-in-out">
                                <TableCell className="py-3 px-4 sm:px-6">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={company.logo} className="rounded-full object-cover" />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="py-3 px-4 sm:px-6 font-medium text-black">
                                    {company.name}
                                </TableCell>
                                <TableCell className="py-3 px-4 sm:px-6 text-black">
                                    {company.createdAt.split("T")[0]}
                                </TableCell>
                                <TableCell className="py-3 px-4 sm:px-6 text-right cursor-pointer">
                                <div className="flex justify-end">
                                    <Popover>
                                        <PopoverTrigger className="flex items-center justify-end">
                                            <MoreHorizontal className="w-6 h-6 text-black hover:text-indigo-600 transition" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 p-2 bg-white rounded-md shadow-lg border border-gray-200">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className="flex items-center gap-2 px-3 py-2 hover:bg-indigo-100 rounded cursor-pointer text-gray-700 transition"
                                            >
                                                <Edit2 className="w-4 text-indigo-600" />
                                                <span className="text-sm">Edit</span>
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

  )
}

export default CompaniesTable
