import { IconButton, PageTitle } from '../../../shared/ui';

export const SaveNewHabit = () => {
  const saveNewHabit = () => {
    console.log('saveNewHabit');
  };

  return (
    <PageTitle
      title={'New Habit'}
      rightAddon={<IconButton icon="save" size={32} callback={saveNewHabit} />}
    />
  );
};
