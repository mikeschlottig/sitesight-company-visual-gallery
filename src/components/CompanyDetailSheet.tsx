import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Company } from "@/lib/api";
interface CompanyDetailSheetProps {
  company: Company | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function CompanyDetailSheet({ company, open, onOpenChange }: CompanyDetailSheetProps) {
  if (!company) return null;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <div className="h-full flex flex-col">
          <div className="relative">
            <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
              {company.ogImage ? (
                <img
                  src={company.ogImage}
                  alt={company.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
          </div>
          <div className="p-6 flex-1 overflow-y-auto">
            <SheetHeader className="text-left">
              <SheetTitle className="text-2xl font-bold font-display">{company.name}</SheetTitle>
              <SheetDescription className="text-muted-foreground pt-1">
                <a
                  href={`https://${company.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {company.domain}
                </a>
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">About</h3>
                <p className="text-muted-foreground text-pretty">{company.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {company.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              {company.techStack && company.techStack.length > 0 && (
                 <div>
                    <h3 className="font-semibold text-foreground mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {company.techStack.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
              )}
            </div>
          </div>
          <div className="p-6 border-t">
            <Button asChild className="w-full">
              <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer">
                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}