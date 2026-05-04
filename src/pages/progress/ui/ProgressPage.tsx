import { useState } from 'react';
import { Text, View } from 'react-native';

import { ProgressInfo } from '../../../entities/progress';
import { BottomSheet } from '../../../shared/ui/BottomSheet';
import { Layout } from '../../../widgets';

export const ProgressPage = () => {
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
        title="Rules"
        onClose={closeBottomSheet}
      >
        <Text> XP</Text>
      </BottomSheet>
    </View>
  );
};
