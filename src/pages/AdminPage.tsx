import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
// Mock data - in a real app, this would come from an API
const initialCompanies = [
  { id: '1', name: 'Shopify', domain: 'shopify.com', description: 'E-commerce platform.', tags: 'E-commerce,SaaS' },
  { id: '2', name: 'GitHub', domain: 'github.com', description: 'Developer platform.', tags: 'Developer Tools,SaaS' },
  { id: '3', name: '37signals', domain: '37signals.com', description: 'The calm company.', tags: 'Productivity,SaaS' },
];
type AdminCompany = { id: string; name: string; domain:string; description: string; tags: string; };
export function AdminPage() {
  const [companies, setCompanies] = useState<AdminCompany[]>(initialCompanies);
  const [editingCompany, setEditingCompany] = useState<AdminCompany | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleEdit = (company: AdminCompany) => {
    setEditingCompany(company);
    setIsDialogOpen(true);
  };
  const handleDelete = (id: string) => {
    setCompanies(companies.filter(c => c.id !== id));
    toast.success("Company deleted successfully.");
  };
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCompany) return;
    if (editingCompany.id) {
      setCompanies(companies.map(c => c.id === editingCompany.id ? editingCompany : c));
      toast.success("Company updated successfully.");
    } else {
      const newCompany = { ...editingCompany, id: String(Date.now()) };
      setCompanies([...companies, newCompany]);
      toast.success("Company added successfully.");
    }
    setIsDialogOpen(false);
    setEditingCompany(null);
  };
  const handleAddNew = () => {
    setEditingCompany({ id: '', name: '', domain: '', description: '', tags: '' });
    setIsDialogOpen(true);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-display">Admin Dashboard</h1>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Company
          </Button>
        </div>
        {/* 
          PRODUCTION INTEGRATION NOTES:
          - Replace the mock `companies` state with data fetched from a secure Rails API endpoint (e.g., /api/v1/admin/companies).
          - Implement authentication and authorization to protect this page.
          - The `handleSave` and `handleDelete` functions should make POST/PUT/DELETE requests to the Rails backend.
          - The Rails backend can be deployed using Kamal for zero-downtime, blue/green deployments.
            - `kamal setup` to provision servers.
            - `kamal deploy` to deploy the application.
            - Kamal manages Docker containers, Traefik for proxying, and can handle database "accessories".
          - For features like OG image scraping or screenshots, the Rails app can trigger background jobs (e.g., with SolidQueue)
            that call a separate Cloudflare Worker or a third-party service.
        */}
        <Card>
          <CardHeader>
            <CardTitle>Manage Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.domain}</TableCell>
                      <TableCell className="text-muted-foreground">{company.description}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(company)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(company.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCompany?.id ? 'Edit Company' : 'Add New Company'}</DialogTitle>
            </DialogHeader>
            {editingCompany && (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={editingCompany.name} onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="domain">Domain</Label>
                  <Input id="domain" value={editingCompany.domain} onChange={(e) => setEditingCompany({ ...editingCompany, domain: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={editingCompany.description} onChange={(e) => setEditingCompany({ ...editingCompany, description: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input id="tags" value={editingCompany.tags} onChange={(e) => setEditingCompany({ ...editingCompany, tags: e.target.value })} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}