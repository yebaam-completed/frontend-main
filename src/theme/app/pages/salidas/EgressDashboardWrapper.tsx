import { FC } from 'react'
import { useIntl } from 'react-intl'
import { Content } from '../../../features/layout/components/content'
import { ToolbarWrapper } from '../../../features/layout/components/toolbar'
import { PageTitle } from '../../../features/layout/core'

const EgressDashboardWrapper: FC = () => (
  <>
    <ToolbarWrapper />
    <Content>
      <div>EGRESO PAGES</div>
    </Content>
  </>
)

const DashboardWrapperEgress: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({ id: 'EGRESO' })}</PageTitle>
      <EgressDashboardWrapper />
    </>
  )
}

export { DashboardWrapperEgress }
