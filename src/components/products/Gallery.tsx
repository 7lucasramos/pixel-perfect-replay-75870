import { useState } from "react";
import { Image, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
export function Gallery({ images = [], name }: { images?: string[] | undefined; name: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  return <><div className="grid gap-6 md:grid-cols-3">{images.length ? images.map((image, i) => <Button key={`${image}-${i}`} variant="ghost" className="gallery-item" onClick={() => setSelected(i)} aria-label={`Ampliar foto ${i+1} de ${name}`}><img src={image} alt={`${name} — foto ${i+1}`} width={800} height={600} loading="lazy" /><ZoomIn className="absolute bottom-4 right-4" aria-hidden="true" /></Button>) : [0,1,2].map(i => <div key={i} className="gallery-placeholder"><Image size={28} strokeWidth={1} aria-hidden="true" /><p>Foto a enviar</p></div>)}</div><Dialog open={selected !== null} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="max-w-4xl"><DialogTitle>{name}</DialogTitle><DialogDescription>Galeria de imagens</DialogDescription>{selected !== null && images[selected] && <img src={images[selected]} alt={`${name} — foto ${selected+1}`} width={1200} height={900} className="max-h-[70svh] w-full object-contain" />}</DialogContent></Dialog></>;
}