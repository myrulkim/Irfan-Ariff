"use client";

import { useTransition, useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { addCertificate, updateCertificate, deleteCertificate } from "@/lib/actions/certificates";
import { createClient } from "@/lib/supabase/client";
import { CertificateData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Loader2 } from "lucide-react";

export default function CertificatesAdmin() {
    const [certificates, setCertificates] = useState<CertificateData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CertificateData | null>(null);
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);

    const loadData = async () => {
        setIsLoading(true);
        const supabase = createClient();
        const { data } = await supabase.from('certificates').select('*').order('display_order', { ascending: true });
        if (data) setCertificates(data as CertificateData[]);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = editingItem
                ? await updateCertificate(editingItem.id, formData)
                : await addCertificate(formData);

            if (result?.error) toast.error(`Error: ${result.error}`);
            else {
                toast.success(editingItem ? "Updated!" : "Added!");
                setIsDialogOpen(false);
                setEditingItem(null);
                loadData();
            }
        });
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this certificate?")) return;

        startTransition(async () => {
            const result = await deleteCertificate(id);
            if (result?.error) toast.error(`Error: ${result.error}`);
            else {
                toast.success("Deleted!");
                loadData();
            }
        });
    }

    const openEdit = (item: CertificateData) => {
        setEditingItem(item);
        setIsDialogOpen(true);
    }

    const openCreate = () => {
        setEditingItem(null);
        setIsDialogOpen(true);
    }

    return (
        <div className="space-y-8 font-mono">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Certificates</h2>
                    <p className="text-sm text-neutral-500">Manage your professional credentials.</p>
                </div>
                <Button onClick={openCreate} className="bg-green-500 text-black hover:bg-green-400 font-bold h-10 w-10 p-0 sm:w-auto sm:px-4 sm:p-2 sm:h-10">
                    <Plus className="w-5 h-5 sm:mr-2" />
                    <span className="hidden sm:inline">Add Certificate</span>
                </Button>
            </div>

            <div className="rounded-xl border border-white/5 bg-neutral-900/40 overflow-hidden">
                <Table>
                    <TableHeader className="bg-neutral-950/50">
                        <TableRow className="border-white/5 hover:bg-white/5">
                            <TableHead className="text-neutral-400 font-mono text-xs uppercase">Title / Issuer</TableHead>
                            <TableHead className="text-neutral-400 font-mono text-xs uppercase hidden sm:table-cell">Date</TableHead>
                            <TableHead className="text-neutral-400 font-mono text-xs uppercase">Link</TableHead>
                            <TableHead className="text-right text-neutral-400 font-mono text-xs uppercase">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={4} className="text-center h-24"><Loader2 className="w-5 h-5 text-green-500 animate-spin mx-auto" /></TableCell></TableRow>
                        ) : certificates.length === 0 ? (
                            <TableRow><TableCell colSpan={4} className="text-center h-24 text-neutral-500">No data found.</TableCell></TableRow>
                        ) : (
                            certificates.map(item => (
                                <TableRow key={item.id} className="border-white/5 hover:bg-white/5">
                                    <TableCell>
                                        <div className="font-medium text-white">{item.title}</div>
                                        <div className="text-neutral-500 text-xs">{item.issuer}</div>
                                    </TableCell>
                                    <TableCell className="text-neutral-400 hidden sm:table-cell">{item.issue_date}</TableCell>
                                    <TableCell>
                                        {item.credential_url ? <a href={item.credential_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs">Verify</a> : <span className="text-neutral-600 text-xs">None</span>}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-neutral-400"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-neutral-950 border-white/10 text-white font-mono">
                                                <DropdownMenuItem onClick={() => openEdit(item)} className="cursor-pointer text-xs">Edit</DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-red-500 cursor-pointer text-xs">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-xl bg-neutral-950 border-white/10 text-white font-mono">
                    <DialogHeader>
                        <DialogTitle className="tracking-widest">{editingItem ? 'EDIT_CERT' : 'NEW_CERT'}</DialogTitle>
                    </DialogHeader>

                    <form ref={formRef} action={handleSubmit} className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs uppercase text-neutral-400">Title</Label>
                            <Input id="title" name="title" defaultValue={editingItem?.title} required className="bg-black/50 border-white/10 text-white" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="issuer" className="text-xs uppercase text-neutral-400">Issuer</Label>
                                <Input id="issuer" name="issuer" defaultValue={editingItem?.issuer} required className="bg-black/50 border-white/10 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="issue_date" className="text-xs uppercase text-neutral-400">Date (e.g. Aug 2024)</Label>
                                <Input id="issue_date" name="issue_date" defaultValue={editingItem?.issue_date} required className="bg-black/50 border-white/10 text-white" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="credential_url" className="text-xs uppercase text-neutral-400">Credential URL</Label>
                            <Input id="credential_url" name="credential_url" type="url" defaultValue={editingItem?.credential_url || ''} className="bg-black/50 border-white/10 text-white" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-center bg-black/20 p-4 rounded-lg border border-white/5">
                            <div className="space-y-2">
                                <Label htmlFor="icon_tag" className="text-xs uppercase text-neutral-400">Icon Tag</Label>
                                <Input id="icon_tag" name="icon_tag" defaultValue={editingItem?.icon_tag || 'award'} className="bg-black/50 border-white/10 text-white" placeholder="award, code, server..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="display_order" className="text-xs uppercase tracking-wider text-neutral-400">Order</Label>
                                <Input id="display_order" name="display_order" type="number" defaultValue={editingItem?.display_order || "0"} className="bg-black border-white/5 text-white w-20" />
                            </div>
                        </div>

                        <Button type="submit" disabled={isPending} className="w-full bg-white text-black hover:bg-neutral-200 mt-4">
                            {isPending ? "SAVING..." : "SAVE_CERT"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
