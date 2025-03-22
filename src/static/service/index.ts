 
// Define the data type for our table
export type TableItem = {
  id: string
  title: string
  service: string
  status: "active" | "inactive"
}


// Sample data
export const ServiceMockData: TableItem[] = [
    {
      id: "1",
      title: "Website Redesign",
      service: "Web Development",
      status: "active",
    },
    {
      id: "2",
      title: "Logo Design",
      service: "Graphic Design",
      status: "inactive",
    },
    {
      id: "3",
      title: "SEO Optimization",
      service: "Marketing",
      status: "active",
    },
    {
      id: "4",
      title: "Mobile App Development",
      service: "App Development",
      status: "active",
    },
    {
      id: "5",
      title: "Content Writing",
      service: "Content",
      status: "inactive",
    },
    {
      id: "6",
      title: "Social Media Campaign",
      service: "Marketing",
      status: "active",
    },
    {
      id: "7",
      title: "Email Newsletter",
      service: "Email Marketing",
      status: "inactive",
    },
  ]