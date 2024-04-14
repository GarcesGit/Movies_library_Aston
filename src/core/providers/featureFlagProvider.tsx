import React, { useMemo } from 'react';
import { FeatureFlagContext } from '../contexts/';
import { useGetFeatureFlagQuery } from '../api/featureFlagApi';
import { FeatureFlag } from '../../types/contextTypes/contextTypes';

type FeatureFlagProps = {
  children: React.ReactNode;
};

const featureFlagFalse: FeatureFlag = {
  isTelegramShareEnabled: false,
};

export const FeatureFlagProvider = ({ children }: FeatureFlagProps) => {
  const { data } = useGetFeatureFlagQuery();

  const value = useMemo(() => {
    if (data) {
      return data;
    }
    return featureFlagFalse;
  }, [data]);

  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
