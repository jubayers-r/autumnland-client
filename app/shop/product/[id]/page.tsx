import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getProductById, MOCK_PRODUCT_DETAILS } from "@/lib/products";
import { ProductDetailGallery } from "@/components/product/ProductDetailGallery";
import { ProductDetailOrder } from "@/components/product/ProductDetailOrder";
import { ProductSectionTabs } from "@/components/product";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export const instant = false;

export async function generateStaticParams() {
  return Object.keys(MOCK_PRODUCT_DETAILS).map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | AUTUMN LAND",
    };
  }

  return {
    title: `${product.title} | AUTUMN LAND`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex-1 flex flex-col w-full bg-background text-foreground">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-5 sm:py-6 lg:py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-6 sm:mb-8 lg:mb-10">
          <BreadcrumbList className="text-xs sm:text-sm font-sans text-muted-foreground">
            {product.breadcrumbs.map((crumb, idx) => {
              const isLast = idx === product.breadcrumbs.length - 1;
              return (
                <React.Fragment key={idx}>
                  <BreadcrumbItem>
                    {isLast || !crumb.href ? (
                      <BreadcrumbPage className="font-medium text-foreground">
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href} className="hover:text-foreground transition-colors">
                          {crumb.label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator>
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main Product Details Grid: Left Gallery + Right Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start">
          <ProductDetailGallery images={product.images} title={product.title} />
          <ProductDetailOrder product={product} />
        </div>

        {/* Product Details, Reviews, FAQs Section with functioning tabs */}
        <section className="mt-12 sm:mt-16 lg:mt-20">
          <ProductSectionTabs product={product} />
        </section>
      </div>
    </main>
  );
}
