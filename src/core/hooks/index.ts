import { useContext } from 'react';
import { AuthContext, FeatureFlagContext } from '../contexts';

export const useAuth = () => useContext(AuthContext);

export const useFeatureFlag = () => useContext(FeatureFlagContext);
