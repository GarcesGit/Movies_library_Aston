import { createContext } from 'react';
import {
  AuthContextType,
  FeatureFlag,
} from '../../types/contextTypes/contextTypes';

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

const initialFeatureFlag: FeatureFlag = {
  isTelegramShareEnabled: false,
};

export const FeatureFlagContext = createContext(initialFeatureFlag);
