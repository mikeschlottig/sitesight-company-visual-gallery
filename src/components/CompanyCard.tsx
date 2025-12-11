import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pin } from 'lucide-react';
import { Company } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
interface CompanyCardProps {
  company: Company;
  variant?: 'grid' | 'list';
  onDetailsClick: (company: Company) => void;
}
export function CompanyCard({ company, variant = 'grid', onDetailsClick }: CompanyCardProps) {
  const isGrid = variant === 'grid';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className={cn(
        "h-full flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1",
        isGrid ? '' : 'sm:flex-row'
      )}>
        <div className={cn(
          "relative group overflow-hidden",
          isGrid ? 'aspect-video rounded-t-lg' : 'sm:w-1/3 aspect-video sm:aspect-square sm:rounded-l-lg sm:rounded-r-none rounded-t-lg'
        )}>
          <img
            src={company.ogImage || `https://placehold.co/600x400/EEE/31343C?text=${company.domain}`}
            alt={company.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className={cn("flex flex-col flex-1", isGrid ? '' : 'p-6')}>
          {isGrid ? (
            <>
              <CardHeader>
                <CardTitle className="truncate">{company.name}</CardTitle>
                <p className="text-sm text-muted-foreground truncate">{company.domain}</p>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {company.tags.slice(0, 2).map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => onDetailsClick(company)}>
                  View Details
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold font-display">{company.name}</h3>
              <p className="text-sm text-muted-foreground">{company.domain}</p>
              <p className="mt-3 text-sm text-muted-foreground flex-1 line-clamp-2">{company.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {company.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
              <div className="mt-6 flex items-center gap-2">
                <Button size="sm" onClick={() => onDetailsClick(company)}>View Details</Button>
                <Button variant="outline" size="sm">Visit Site</Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
export function CompanyCardSkeleton({ variant = 'grid' }: { variant?: 'grid' | 'list' }) {
  const isGrid = variant === 'grid';
  if (isGrid) {
    return (
      <Card>
        <Skeleton className="aspect-video rounded-t-lg" />
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-full" />
        </CardFooter>
      </Card>
    );
  }
  return (
    <Card className="flex flex-col sm:flex-row">
      <Skeleton className="sm:w-1/3 aspect-video sm:aspect-square sm:rounded-l-lg sm:rounded-r-none rounded-t-lg" />
      <div className="p-6 flex-1 space-y-3">
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex gap-2 pt-3">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </Card>
  );
}