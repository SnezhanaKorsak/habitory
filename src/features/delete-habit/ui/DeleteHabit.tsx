import { Alert } from 'react-native';

import { useHabitsStore } from '../../../entities/habits';
import { IconButton } from '../../../shared/ui';

type Props = {
  id: string;
};

export const DeleteHabit = ({ id }: Props) => {
  const deleteHabit = useHabitsStore((state) => state.deleteHabit);

  const onDelete = () => {
    Alert.alert('Delete habit?', 'This action cannot be undone', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteHabit(id),
      },
    ]);
  };

  return <IconButton icon={'trash-2'} callback={onDelete} />;
};
