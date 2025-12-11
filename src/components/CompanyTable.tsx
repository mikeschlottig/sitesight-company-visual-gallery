import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Download, MoreHorizontal } from "lucide-react";
import { Company } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from '@/components/ui/skeleton';
interface CompanyTableProps {
  companies: Company[];
  isLoading: boolean;
  onSort: (column: keyof Company) => void;
  onDetailsClick: (company: Company) => void;
}
export function CompanyTable({ companies, isLoading, onSort, onDetailsClick }: CompanyTableProps) {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set());
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(companies.map(c => c.id)));
    } else {
      setSelectedRows(new Set());
    }
  };
  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(id);
    } else {
      newSelectedRows.delete(id);
    }
    setSelectedRows(newSelectedRows);
  };
  const isAllSelected = selectedRows.size > 0 && selectedRows.size === companies.length;
  const isSomeSelected = selectedRows.size > 0 && !isAllSelected;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-display">Company Directory</h2>
        <div className="flex items-center gap-2">
          {selectedRows.size > 0 && (
            <span className="text-sm text-muted-foreground">{selectedRows.size} selected</span>
          )}
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={isAllSelected || isSomeSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all rows"
                  data-state={isSomeSelected ? 'indeterminate' : (isAllSelected ? 'checked' : 'unchecked')}
                />
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => onSort('name')}>
                  Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => onSort('lastUpdated')}>
                  Last Updated <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                  <TableCell><div className="flex gap-2"><Skeleton className="h-5 w-16" /><Skeleton className="h-5 w-20" /></div></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 rounded-md" /></TableCell>
                </TableRow>
              ))
            ) : companies.length > 0 ? (
              companies.map((company) => (
                <TableRow key={company.id} data-state={selectedRows.has(company.id) ? "selected" : ""}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(company.id)}
                      onCheckedChange={(checked) => handleSelectRow(company.id, !!checked)}
                      aria-label={`Select row for ${company.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell className="text-muted-foreground">{company.domain}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {company.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{company.lastUpdated}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onDetailsClick(company)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Visit Website</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No companies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}