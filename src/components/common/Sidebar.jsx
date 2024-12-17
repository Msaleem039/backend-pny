import { BarChart2, BookAIcon, Menu, Settings, TrendingUp } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { GiTeacher } from "react-icons/gi";
import { MdEvent, MdEventNote, MdEventRepeat, MdFolderSpecial, MdQueryBuilder, MdQueryStats } from "react-icons/md";
import { TbWriting } from "react-icons/tb";
import { FaQq } from "react-icons/fa6";
import { QueueListIcon } from "@heroicons/react/24/outline";
import { FcGallery, FcQuestions } from "react-icons/fc";
import { BsQuestion } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import EventCategory from "../eventCategory/EventCategory";
import ModelEvent from "../CourseModel/ModelCourse";
import { SiMetrodelaciudaddemexico } from "react-icons/si";

const SIDEBAR_ITEMS = [
	{
		name: "Pny Dashboard",
		icon: BarChart2,
		color: "#6366f1",
		href: "/",
	},
	{
		name: "Courses",
		icon: BookAIcon,
		color: "#EC4899",
		href: "#",
		dropdown: [
			{ name: "Category", icon: BiCategory, color: "#8B5CF6", href: "/course-categories" },
			{ name: "Courses", icon: BookAIcon, color: "#EC4899", href: "/courses" },
			{ name: "CourseModel", icon:SiMetrodelaciudaddemexico, color: "#EC4899", href: "/coursemodel" },
			
		]
	},
	{
		name: "Blog",
		icon: TbWriting,
		color: "#EC4899",
		href: "#",
		dropdown: [
			{ name: "Blog Categories", icon: BiCategory, color: "#8B5CF6", href: "/blog-categories" },
			{ name: "Blog Post", icon: BookAIcon, color: "#EC4899", href: "/blog-post" }
		]
	},
	{
		name: "Instructor",
		icon: GiTeacher,
		color: "#10B981",
		href: "/users",
	},
	{
		name: "Special Blog",
		icon: MdFolderSpecial,
		color: "#F59E0B",
		href: "#",
		dropdown: [
			{ name: "SP-C Categories", icon: MdFolderSpecial, color: "#F59E0B", href: "/sp-c-categories" },
			{ name: "SP-C Blog Post", icon: MdFolderSpecial, color: "#F59E0B", href: "/sp-c-blog-post" }
		]
	},
	{ name: "E-Flyers", icon: MdFolderSpecial, color: "#F59E0B", href: "#",
		dropdown: [
            { name: "E-Flyers", icon: BiCategory, color: "#8B5CF6", href: "/eflayer" }
		]
	 },
	{ name: "Faqs", icon: FaQq, color: "#F59E0B", href: "#" ,
		dropdown: [
            { name: "Faqs", icon: BiCategory, color: "#8B5CF6", href: "/faqs" },
   
		]
	},
	{ name: "Faquestion", icon:BsQuestion, color: "#F59E0B", href: "#" ,
		dropdown: [
            { name: "Faquestion", icon:FcQuestions, color: "#8B5CF6", href: "/faquestion" },
   
		]
	},
	{ name: "Gallery", icon:GrGallery, color: "#F59E0B", href: "#" ,
		dropdown: [
            { name: "Gallery", icon:FcGallery, color: "#8B5CF6", href: "/gallery" },
		]
	},
	{ name: "FreeTrial", icon:MdQueryStats, color: "#F59E0B", href: "#" ,
		dropdown: [
            { name: "FreeTrialQ", icon:MdQueryBuilder, color: "#8B5CF6", href: "/freetrail" },
		]
	},
	{ name: "Event", icon:MdEventNote, color: "#F59E0B", href: "#" ,
		dropdown: [
            { name: "EventCat", icon:MdEvent, color: "#8B5CF6", href: "/eventcat" },
			{ name: "EventPost", icon:MdEventRepeat, color: "#8B5CF6", href: "/event-post" },
		]
	},
	{ name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
	{ name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [openDropdown, setOpenDropdown] = useState(null); // Manage open dropdown

	const toggleDropdown = (name) => {
		if (openDropdown === name) {
			setOpenDropdown(null); // Close if it's already open
		} else {
			setOpenDropdown(name); // Open selected dropdown
		}
	};

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700 overflow-y-auto'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>

				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item) => (
						<div key={item.name}>
							{/* Dropdown logic */}
							{item.dropdown ? (
								<div>
									<motion.div
										onClick={() => toggleDropdown(item.name)}
										className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 cursor-pointer'
									>
										<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
										<AnimatePresence>
											{isSidebarOpen && (
												<motion.span
													className='ml-4 whitespace-nowrap'
													initial={{ opacity: 0, width: 0 }}
													animate={{ opacity: 1, width: "auto" }}
													exit={{ opacity: 0, width: 0 }}
													transition={{ duration: 0.2, delay: 0.3 }}
												>
													{item.name}
												</motion.span>
											)}
										</AnimatePresence>
									</motion.div>
									{/* Render dropdown items */}
									<AnimatePresence>
										{openDropdown === item.name && (
											<motion.div
												initial={{ opacity: 0, height: 0 }}
												animate={{ opacity: 1, height: "auto" }}
												exit={{ opacity: 0, height: 0 }}
												className='pl-8 space-y-2'
											>
												{item.dropdown.map((subItem) => (
													<Link key={subItem.href} to={subItem.href}>
														<motion.div className='flex items-center p-2 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors'>
															<subItem.icon size={16} style={{ color: subItem.color }} />
															<AnimatePresence>
																{isSidebarOpen && (
																	<motion.span
																		className='ml-2 whitespace-nowrap'
																		initial={{ opacity: 0, width: 0 }}
																		animate={{ opacity: 1, width: "auto" }}
																		exit={{ opacity: 0, width: 0 }}
																		transition={{ duration: 0.2, delay: 0.3 }}
																	>
																		{subItem.name}
																	</motion.span>
																)}
															</AnimatePresence>
														</motion.div>
													</Link>
												))}
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							) : (
								<Link to={item.href}>
									<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
										<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
										<AnimatePresence>
											{isSidebarOpen && (
												<motion.span
													className='ml-4 whitespace-nowrap'
													initial={{ opacity: 0, width: 0 }}
													animate={{ opacity: 1, width: "auto" }}
													exit={{ opacity: 0, width: 0 }}
													transition={{ duration: 0.2, delay: 0.3 }}
												>
													{item.name}
												</motion.span>
											)}
										</AnimatePresence>
									</motion.div>
								</Link>
							)}
						</div>
					))}
				</nav>
			</div>
		</motion.div>
	);
};

export default Sidebar;
