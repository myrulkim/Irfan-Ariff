"use client";

import { useTransition, useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { addProject, updateProject, deleteProject } from "@/lib/actions/projects";
import { createClient } from "@/lib/supabase/client";
import { ProjectData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Loader2 } from "lucide-react";

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);

    const loadProjects = async () => {
        setIsLoading(true);
        const supabase = createClient();
        const { data } = await supabase.from('projects').select('*').order('is_latest', { ascending: false }).order('display_order', { ascending: true });
        if (data) setProjects(data as ProjectData[]);
        setIsLoading(false);
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = editingProject
                ? await updateProject(editingProject.id, formData)
                : await addProject(formData);

            if (result?.error) {
                toast.error(`Error: ${result.error}`);
            } else {
                toast.success(editingProject ? "Project updated!" : "Project added!");
                setIsDialogOpen(false);
                setEditingProject(null);
                loadProjects();
            }
        });
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        startTransition(async () => {
            const result = await deleteProject(id);
            if (result?.error) toast.error(`Error: ${result.error}`);
            else {
                toast.success("Project deleted!");
                loadProjects();
            }
        });
    }

    const openEditDialog = (project: ProjectData) => {
        setEditingProject(project);
        setIsDialogOpen(true);
    }

    const openCreateDialog = () => {
        setEditingProject(null);
        setIsDialogOpen(true);
    }

    return (
        <div className="space-y-8 font-mono">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Projects Module</h2>
                    <p className="text-sm text-neutral-500">Manage your portfolio projects.</p>
                </div>
                <Button onClick={openCreateDialog} className="bg-green-500 text-black hover:bg-green-400 font-bold border-none h-10 w-10 p-0 sm:w-auto sm:px-4 sm:p-2 sm:h-10">
                    <Plus className="w-5 h-5 sm:mr-2" />
                    <span className="hidden sm:inline">Add Project</span>
                </Button>
            </div>

            <div className="rounded-xl border border-white/5 bg-neutral-900/40 overflow-hidden">
                <Table>
                    <TableHeader className="bg-neutral-950/50">
                        <TableRow className="border-white/5 hover:bg-white/5">
                            <TableHead className="text-neutral-400 font-mono text-xs uppercase">Title</TableHead>
                            <TableHead className="text-neutral-400 font-mono text-xs uppercase hidden sm:table-cell">Category</TableHead>
                            <TableHead className="text-neutral-400 font-mono text-xs uppercase">Status</TableHead>
                            <TableHead className="text-neutral-400 font-mono text-xs uppercase">COMMERCIAL</TableHead>
                            <TableHead className="text-neutral-400 font-mono text-xs uppercase text-right">Order</TableHead>
                            <TableHead className="text-right text-neutral-400 font-mono text-xs uppercase">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">
                                    <Loader2 className="w-5 h-5 text-green-500 animate-spin mx-auto" />
                                </TableCell>
                            </TableRow>
                        ) : projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-neutral-500 text-sm">
                                    No projects found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            projects.map(project => (
                                <TableRow key={project.id} className="border-white/5 hover:bg-white/5 data-[state=selected]:bg-neutral-800">
                                    <TableCell className="font-medium text-white">{project.title}</TableCell>
                                    <TableCell className="text-neutral-500 hidden sm:table-cell">{project.category}</TableCell>
                                    <TableCell>
                                        {project.is_latest ? (
                                            <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded text-xs">LATEST</span>
                                        ) : (
                                            <span className="text-neutral-500 text-xs">STANDARD</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {project.is_commercial ? (
                                            <span className="text-amber-500 bg-amber-500/10 px-2 py-1 rounded text-xs font-bold ring-1 ring-amber-500/20">YES</span>
                                        ) : (
                                            <span className="text-neutral-600 text-[10px]">NO</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right text-neutral-400">{project.display_order}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-neutral-400 hover:text-white">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-neutral-950 border-white/10 text-white font-mono">
                                                <DropdownMenuLabel className="text-xs text-neutral-500">Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => openEditDialog(project)} className="hover:bg-neutral-900 focus:bg-neutral-900 cursor-pointer text-xs">
                                                    Edit project
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem onClick={() => handleDelete(project.id)} className="text-red-500 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-500 cursor-pointer text-xs">
                                                    Delete project
                                                </DropdownMenuItem>
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
                <DialogContent className="sm:max-w-2xl bg-neutral-950 border-white/10 text-white font-mono max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl tracking-widest">{editingProject ? 'EDIT_PROJECT' : 'NEW_PROJECT'}</DialogTitle>
                    </DialogHeader>

                    <form ref={formRef} action={handleSubmit} className="space-y-6 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-xs uppercase tracking-wider text-neutral-400">Title</Label>
                                <Input id="title" name="title" defaultValue={editingProject?.title} required className="bg-black/50 border-white/10 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug" className="text-xs uppercase tracking-wider text-neutral-400">Slug</Label>
                                <Input id="slug" name="slug" defaultValue={editingProject?.slug} required className="bg-black/50 border-white/10 text-white" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-xs uppercase tracking-wider text-neutral-400">Description</Label>
                            <Textarea id="description" name="description" defaultValue={editingProject?.description} required className="bg-black/50 border-white/10 text-white min-h-24" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-xs uppercase tracking-wider text-neutral-400">Category</Label>
                                <Select name="category" defaultValue={editingProject?.category || "web"}>
                                    <SelectTrigger className="bg-black/50 border-white/10 text-white">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-neutral-900 border-white/10 text-white font-mono">
                                        <SelectItem value="web">web</SelectItem>
                                        <SelectItem value="mobile">mobile</SelectItem>
                                        <SelectItem value="system">system</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tech_stack" className="text-xs uppercase tracking-wider text-neutral-400">Tech Stack (CSV)</Label>
                                <Input id="tech_stack" name="tech_stack" defaultValue={editingProject?.tech_stack?.join(', ')} className="bg-black/50 border-white/10 text-white" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="image_primary" className="text-xs uppercase tracking-wider text-neutral-400">Primary Image</Label>
                                <div className="flex flex-col gap-2">
                                    {editingProject?.image_primary && (
                                        <div className="relative w-20 h-20 rounded border border-white/10 overflow-hidden bg-black/50">
                                            <img src={editingProject.image_primary} alt="Primary" className="w-full h-full object-cover" />
                                            <input type="hidden" name="existing_image_primary" defaultValue={editingProject.image_primary} />
                                        </div>
                                    )}
                                    <Input id="image_primary" name="image_primary" type="file" accept="image/*" className="bg-black/50 border-white/10 text-white text-xs cursor-pointer file:bg-neutral-800 file:border-none file:text-white file:text-[10px] file:mr-2" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image_secondary" className="text-xs uppercase tracking-wider text-neutral-400">Secondary Image</Label>
                                <div className="flex flex-col gap-2">
                                    {editingProject?.image_secondary && (
                                        <div className="relative w-20 h-20 rounded border border-white/10 overflow-hidden bg-black/50">
                                            <img src={editingProject.image_secondary} alt="Secondary" className="w-full h-full object-cover" />
                                            <input type="hidden" name="existing_image_secondary" defaultValue={editingProject.image_secondary} />
                                        </div>
                                    )}
                                    <Input id="image_secondary" name="image_secondary" type="file" accept="image/*" className="bg-black/50 border-white/10 text-white text-xs cursor-pointer file:bg-neutral-800 file:border-none file:text-white file:text-[10px] file:mr-2" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="live_url" className="text-xs uppercase tracking-wider text-neutral-400">Live URL</Label>
                                <Input id="live_url" name="live_url" defaultValue={editingProject?.live_url || ''} className="bg-black/50 border-white/10 text-white text-xs" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="github_url" className="text-xs uppercase tracking-wider text-neutral-400">GitHub URL</Label>
                                <Input id="github_url" name="github_url" defaultValue={editingProject?.github_url || ''} className="bg-black/50 border-white/10 text-white text-xs" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-black/20 p-4 rounded-lg border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="display_order" className="text-xs uppercase tracking-wider text-neutral-400">Order</Label>
                                    <Input id="display_order" name="display_order" type="number" defaultValue={editingProject?.display_order || "0"} className="bg-black border-white/5 text-white w-20" />
                                </div>
                                <div className="flex items-center space-x-2 pt-6">
                                    <Switch id="is_latest" name="is_latest" defaultChecked={editingProject?.is_latest} />
                                    <Label htmlFor="is_latest" className="text-[10px] text-green-500 font-bold">LATEST_PUSH</Label>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 bg-amber-500/5 p-2 rounded border border-amber-500/10">
                                <Switch id="is_commercial" name="is_commercial" defaultChecked={editingProject?.is_commercial} />
                                <Label htmlFor="is_commercial" className="text-[10px] text-amber-500 font-bold uppercase tracking-tighter">Freelance_Showcase</Label>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-white/10">
                            <Button type="submit" disabled={isPending} className="flex-1 bg-white text-black hover:bg-neutral-200">
                                {isPending ? "EXECUTING..." : (editingProject ? "UPDATE_PROJECT" : "INSERT_PROJECT")}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
