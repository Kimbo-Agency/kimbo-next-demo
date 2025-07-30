import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BANNER_IMAGE_SECTION } from '../queries/getHomePage';

interface Block {
  name: string;
  attributesJSON?: string;
}

interface MediaItem {
  id: string;
  databaseId: number;
  sourceUrl: string;
  altText: string;
}

interface BannerQueryData {
  pageBy: {
    blocks: Block[];
  };
  mediaItems: {
    nodes: MediaItem[];
  };
}

export default function BannerImageSection() {
  const { loading, error, data } = useQuery<BannerQueryData>(GET_BANNER_IMAGE_SECTION);

  if (loading) return <p>Loading banner...</p>;
  if (error) return <p>Error loading banner: {error.message}</p>;

  const bannerBlocks = data?.pageBy?.blocks?.filter(
    (block: Block) => block.name === 'acf/banner-image-section'
  );

  if (!bannerBlocks || bannerBlocks.length === 0) {
    return <p>No banner blocks found.</p>;
  }

  return (
    <>
      {bannerBlocks.map((block: Block, index: number) => {
        let attrs = null;
        try {
          attrs = block.attributesJSON ? JSON.parse(block.attributesJSON) : null;
        } catch {
          return <p key={index}>Error parsing banner block data.</p>;
        }

        const bannerTitle = attrs?.data?.banner_title || 'Default Banner Title';
        const bannerSubtitle = attrs?.data?.banner_subtitle || '';

        const bannerImageId = attrs?.data?.banner_image;

        const matchedImage = data?.mediaItems?.nodes?.find(
          (item: MediaItem) => item.databaseId === bannerImageId
        );

        const imageUrl = matchedImage?.sourceUrl || '';
        const imageAlt = matchedImage?.altText || 'Banner Image';

        return (
          <section
            key={index}
            className="banner-image-section relative mb-10 h-screen flex flex-col items-center justify-center"
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt={imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <h1
              className="relative z-10 text-white text-center text-6xl p-4"
              dangerouslySetInnerHTML={{ __html: bannerTitle }}
            />
            {bannerSubtitle && (
              <h2
                className="relative z-10 text-white text-center text-3xl p-2 mt-2 max-w-3xl"
                dangerouslySetInnerHTML={{ __html: bannerSubtitle }}
              />
            )}
          </section>
        );
      })}
    </>
  );
}
