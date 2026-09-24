import { Helmet } from '@dr.pogodin/react-helmet';

import { COLOMBIA_TECH_BRAND_NAME } from '@/branding/constants/ColombiaTechBrand';
import { useWorkspaceSurface } from '@/ui/layout/hooks/useWorkspaceSurface';

type PageTitleProps = {
  title: string;
};

export const PageTitle = (props: PageTitleProps) => {
  const workspaceSurface = useWorkspaceSurface();

  if (workspaceSurface.type === 'side-panel') {
    return null;
  }

  const titleIncludesBrand = props.title.includes(COLOMBIA_TECH_BRAND_NAME);
  const documentTitle = titleIncludesBrand
    ? props.title
    : `${props.title} · ${COLOMBIA_TECH_BRAND_NAME}`;

  return (
    <Helmet>
      <title>{documentTitle}</title>
    </Helmet>
  );
};
