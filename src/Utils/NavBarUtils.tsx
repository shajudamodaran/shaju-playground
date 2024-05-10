import { SvgIcons } from "../assets/svg-icons";

export const ModernNavBarOptions = [
  {
    name: "Mail",
    icon: <SvgIcons.MailIcon />,
    subItems: [
      {
        name: "Inbox",
        icon: <SvgIcons.CalendarIcon />,
      },
      {
        name: "Sent",
        icon: <SvgIcons.CalendarIcon />,
      },
      {
        name: "Drafts",
        icon: <SvgIcons.CalendarIcon />,
      },
    ],
  },
  {
    name: "Chat",
    icon: <SvgIcons.ChatIcon />,
    subItems: [
      {
        name: "Home",
        icon: <SvgIcons.CalendarIcon />,
      },
      {
        name: "Mentions",
        icon: <SvgIcons.CalendarIcon />,
      },
      {
        name: "Stared",
        icon: <SvgIcons.CalendarIcon />,
      },
    ],
  },
  {
    name: "Meet",
    icon: <SvgIcons.MeetIcon />,
    subItems: [],
  },
];
