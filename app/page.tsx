import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ToastTrigger } from "@/components/ToastTrigger";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 relative bg-background text-foreground">
      <div className="absolute top-6 right-6">
        <ModeToggle />
      </div>

      <Card className="max-w-lg w-full text-center shadow-lg border">
        <CardHeader className="space-y-2">
          <div className="flex justify-center gap-2 flex-wrap">
            <Badge variant="secondary">Next.js 16.4.3</Badge>
            <Badge variant="outline">React 19</Badge>
            <Badge variant="outline">Tailwind v4</Badge>
            <Badge variant="outline">shadcn/ui</Badge>
          </div>
          <CardTitle>
            <h1 className="text-3xl font-bold tracking-tight">Frontend Starter</h1>
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Zero-friction template optimized for developer speed and LLM-driven pair programming.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Separator />
          <div className="flex flex-col gap-2">
            <ToastTrigger />
          </div>
          <p className="text-xs text-muted-foreground">
            Edit <code className="font-mono font-medium">app/page.tsx</code> to start building your
            application.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
