import Filter from '@/features/gallery/components/Filter';
import Card from '@/features/gallery/components/Card.jsx';
import { useMemo, useState } from 'react';

export default function Gallery({ items = [] }) {
    const [view, setView] = useState('grid');
    const [filter, setFilter] = useState('all');

    const counts = useMemo(() => {
        const c = { all: items.length, images: 0, videos: 0, shorts: 0 };
        items.forEach(it => {
            if (it.type === 'image') c.images++;
            if (it.type === 'video') c.videos++;
            if (it.type === 'short') c.shorts++;
        });
        return c;
    }, [items]);

    const filtered = useMemo(() => {
        if (filter === 'all') return items;
        if (filter === 'images') return items.filter(i => i.type === 'image');
        if (filter === 'videos') return items.filter(i => i.type === 'video');
        if (filter === 'shorts') return items.filter(i => i.type === 'short');
        return items;
    }, [items, filter]);

    return (
        <>
            <Filter counts={counts} onFilterChange={setFilter} onViewChange={setView} />

            <div className={view === 'grid' ? 'gallery-grid' : 'gallery-list'}>
                {filtered.map((it, idx) => (
                    <Card key={it.id || idx} {...it} />
                ))}
            </div>
        </>
    );
}

// Example usage from another dev file:
// import Gallery from '@/features/gallery/pages/Gallery';
// import { sampleGalleryData } from '@/features/gallery/data/sampleGalleryData';
// <Gallery items={sampleGalleryData} />