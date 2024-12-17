import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import UsersPage from "./pages/UsersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import AddInstructor from "./pages/AddInstructor";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import CourseCateg from "./pages/CourseCateg";
import Blog from "./components/Blog/Blog";
import AddBlog from "./pages/AddBlog";
import AddBlogCate from "./pages/AddBlogCate";
import AddBlogPost from "./pages/AddBlogPost";
import AddFlyers from "./pages/AddFlyers";
import AddSpcategories from "./components/SP-C Categories/AddSpcategories";
import AddCategory from "./pages/AddCate";
import Mainspc from "./components/SP-CBlogPost/Mainspc";
import MainspcCate from "./components/SP-C Categories/MainspcCate";
import MainEflyer from "./components/Eflyer/MainEflyer";
import MainFaqs from "./components/Faqs/MainFaqs";
import AddSpecialbp from "./components/SP-CBlogPost/AddSpecialbp";
import Mainblog from "./components/Blog/Mainblog";
import Mainblogcat from "./components/Blog/Mainblogcat";
import EditCourse from "./components/courses/EditCourse";
import EditInstructor from "./components/users/EditInstructor";
import EditBlog from "./components/Blog/EditBlog";
import EditBlogcat from "./components/Blog/EditBlogcat";
import EditSpecialcat from "./components/SP-C Categories/EditSpecialcat";
import Editspecialbp from "./components/SP-C Categories/Editspecialbp";
import EditEFlyer from "./components/Eflyer/EditEFlyer";
import EditCourseCategory from "./components/courses/EditCourseCategory";
import AddFaq from "./components/Faqs/AddFaq";
import EditFaq from "./components/Faqs/Editfaq";
import MainFaqsquestion from "./components/faqQuestions/MainFaqsquestion";
import Editfaquestion from "./components/faqQuestions/Editfaquestion";
import MainGallery from "./components/Gallery/MainGallery";

import AddGallery from "./components/Gallery/AddGallery";
import MainFreeTrail from "./components/freetrailquerry/MainFreeTrail";
import EditGallery from "./components/Gallery/EditGallery";
import MainEventcat from "./components/eventCategory/MainEventcat";
import EditeventCat from "./components/eventCategory/EditeventCat";
import AddEventsCategory from "./components/eventCategory/AddEventsCategory";
import MainEvents from "./components/events/MainEvents";
import AddFaqquestion from "./components/faqQuestions/AddFaqquestion";
import EventDetail from "./components/events/Eventdetail";
import Mainmodel from "./components/CourseModel/Mainmodel";
import AddModel from "./components/CourseModel/AddModel";
import EditModel from "./components/CourseModel/EditModel";
import AddEvents from "./components/events/AddEvents";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Background */}
      {/* <div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div> */}
      <Sidebar />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/users" element={<UsersPage />}>
          {/* Nested route for adding a new instructor */}
          <Route path="adduser" element={<AddInstructor />} />
        </Route>
        <Route path="/users/:userId" element={<EditInstructor />} />
        <Route path="/faqs" element={<MainFaqs />} />
        <Route path="/editfaq/:id" element={<EditFaq />} />
        <Route path="/addfaq" element={<AddFaq />} />
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/editcourse/:courseId" element={<EditCourse />} />
        <Route path="/course-categories" element={<CourseCateg />}>
          <Route path="addcategory" element={<AddCategory />} />
        </Route>
        <Route path="/editcoursecat/:id" element={<EditCourseCategory />} />
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/editblog/:id" element={<EditBlog />} />
        <Route path="/blog-categories" element={<Mainblogcat />}></Route>
        <Route path="/editblogcat/:id" element={<EditBlogcat />} />
        <Route path="/addblogcate" element={<AddBlogCate />} />
        <Route path="/blog-post" element={<Mainblog />}>
          <Route path="addblogpost" element={<AddBlogPost />} />
        </Route>
        <Route path="/eflayer" element={<MainEflyer />}></Route>
        <Route path="/addeflayer" element={<AddFlyers />} />
        <Route path="/editeflyer/:id" element={<EditEFlyer />} />
        <Route path="/sp-c-categories" element={<MainspcCate />}></Route>
        <Route path="/editspc/:id" element={<EditSpecialcat />} />
        <Route path="/addspc" element={<AddSpcategories />} />
        <Route path="/specialbp" element={<AddSpecialbp />} />
        <Route path="/sp-c-blog-post" element={<Mainspc />} />
        <Route path="/sp-c-blog-post/:id" element={<Editspecialbp />} />
        <Route path="/faquestion" element={<MainFaqsquestion />} />
        <Route path="/gallery" element={<MainGallery />}></Route>
        <Route path="/editgallery/:id" element={<EditGallery />} />
        <Route path="/addgallery" element={<AddGallery />} />
        <Route path="/eventcat" element={<MainEventcat />} />
        <Route path="/editeventcat/:id" element={<EditeventCat />} />
        <Route path="/addevent" element={<AddEventsCategory />} />
        <Route path="/addevents" element={<AddEvents />} />
        <Route path="/eventdetail/:id" element={<EventDetail />} />
        <Route path="/editfaquestion/:id" element={<Editfaquestion />} />
        <Route path="/addfaquestion" element={<AddFaqquestion />} />
        <Route path="/event-post" element={<MainEvents />} />
        <Route path="/freetrail" element={<MainFreeTrail />} />
        <Route path="/coursemodel" element={<Mainmodel />} />
        <Route path="/addcoursemodel" element={<AddModel />} />
        <Route path="/editmodel/:id" element={<EditModel />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
