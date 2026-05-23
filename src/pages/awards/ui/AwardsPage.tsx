import { EarnedAwards } from '../../../entities/awards';
import { AvailableAwards } from '../../../entities/awards/ui/AvailableAwards';
import { Layout } from '../../../widgets';

export const AwardsPage = () => {
  return (
    <Layout>
      <EarnedAwards />
      <AvailableAwards />
    </Layout>
  );
};
