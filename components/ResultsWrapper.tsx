import React from 'react';
import { Banner } from './Banner';
import { AnswerCard } from './AnswerCard';
import { PromoCard } from './PromoCard';
import { SourceList } from './SourceList';
import { SearchResponse } from '../types';

interface ResultsWrapperProps {
  data: SearchResponse;
  displayedAnswer: string;
}

export const ResultsWrapper = ({ data, displayedAnswer }: ResultsWrapperProps) => {
  return (
    <div className="mt-8 space-y-6">
      {data.banner && <Banner banner={data.banner} />}
      <AnswerCard answer={displayedAnswer} location={data.location} />

      {(data.offer || data.special_update) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {data.offer && <PromoCard type="offer" title={data.offer.title} url={data.offer.link_url} />}
          {data.special_update && <PromoCard type="update" title={data.special_update.title} url={data.special_update.link_url} />}
        </div>
      )}

      <SourceList sources={data.sources ?? []} />
    </div>
  );
};
