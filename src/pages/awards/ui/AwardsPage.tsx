import { AvailableAwards,EarnedAwards  } from '../../../entities/awards';
import { Layout } from '../../../widgets';

export const AwardsPage = () => {
  return (
    <Layout>
      <EarnedAwards />
      <AvailableAwards />
    </Layout>
  );
};
