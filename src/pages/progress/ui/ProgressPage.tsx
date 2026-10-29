import { useState } from 'react';
import { View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { ProgressInfo } from '../../../entities/progress';
import { ProgressRules } from '../../../entities/progress/ui/ProgressRules';
import { BottomSheet } from '../../../shared/ui/BottomSheet';
import { Layout } from '../../../widgets';

export const ProgressPage = () => {
  const { t } = useTranslation();

  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);

  const openBottomSheet = () => setIsOpenBottomSheet(true);
  const closeBottomSheet = () => setIsOpenBottomSheet(false);
  return (
    <View style={{ flex: 1 }}>
      <Layout>
        <ProgressInfo openBottomSheet={openBottomSheet} />
      </Layout>

      <BottomSheet
        isOpen={isOpenBottomSheet}
        title={t('navigation.rules')}
        onClose={closeBottomSheet}
      >
        <ProgressRules />
      </BottomSheet>
    </View>
  );
};
