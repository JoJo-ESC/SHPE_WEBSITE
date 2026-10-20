import { Link, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { PageHero } from './components/ui'
import { Contact } from './pages/Contact'
import { Eboard } from './pages/Eboard'
import { Events } from './pages/Events'
import { Home } from './pages/Home'
import { MemberSHPE } from './pages/MemberSHPE'
import { OutreachWeekend } from './pages/OutreachWeekend'
import { ProfessionalDevelopment } from './pages/ProfessionalDevelopment'
import { Resources } from './pages/Resources'

function NotFound() {
  return (
    <PageHero title={<>This page took a <em>wrong turn.</em></>} lead="The link may be old. Let's get you back home.">
      <Link to="/" className="btn btn-primary">
        Back to home
      </Link>
    </PageHero>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="membershpe" element={<MemberSHPE />} />
        <Route path="membershpe/professional-development" element={<ProfessionalDevelopment />} />
        <Route path="membershpe/outreach-weekend" element={<OutreachWeekend />} />
        <Route path="events" element={<Events />} />
        <Route path="eboard" element={<Eboard />} />
        <Route path="resources" element={<Resources />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
