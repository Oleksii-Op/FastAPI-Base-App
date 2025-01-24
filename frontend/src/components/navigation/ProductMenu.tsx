import { ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const categories = {
  laptops: {
    title: "Laptops",
    items: [
      "Up to 12\" Laptops",
      "13\" Laptops",
      "14\" Laptops",
      "15\" Laptops",
      "17\" Laptops",
      "Laptop Accessories",
    ],
  },
  monitors: {
    title: "Monitors",
    items: [
      {
        label: 'Up to 20" Monitors',
        diagonal_min: 0,
        diagonal_max: 20
      },
      {
        label: '21-22" Monitors',
        diagonal_min: 21,
        diagonal_max: 22
      },
      {
        label: '23-24" Monitors',
        diagonal_min: 23,
        diagonal_max: 24
      },
      {
        label: '27-28" Monitors',
        diagonal_min: 27,
        diagonal_max: 28
      },
      {
        label: '32" Monitors',
        diagonal_min: 32,
        diagonal_max: 32
      },
    ],
  },
  desktops: {
    title: "Desktops",
    items: [
      {
        label: "Gaming Desktops",
        filter: { is_for_gaming: "true" }
      },
      {
        label: "Office Desktops",
        filter: { is_for_office: "true" }
      },
      {
        label: "Desktops for Studying",
        filter: { is_for_home_studying: "true" }
      },
      {
        label: "Mini PCs",
        filter: { is_mini: "true" }
      },
      {
        label: "All-in-One PCs",
        filter: { has_screen: "true" }
      }
    ],
  },
}

export function ProductMenu() {
  const navigate = useNavigate();

  const handleNavigation = (key: string, item?: any) => {
    if (key === 'laptops') {
      navigate('/laptops');
    } else if (key === 'monitors' && typeof item === 'object') {
      const queryParams = new URLSearchParams({
        offset: '0',
        limit: '25',
        diagonal_min: item.diagonal_min.toString(),
        diagonal_max: item.diagonal_max.toString()
      });
      navigate(`/monitors?${queryParams.toString()}`);
    } else if (key === 'monitors') {
      navigate('/monitors');
    } else if (key === 'desktops' && item?.filter) {
      const queryParams = new URLSearchParams({
        offset: '0',
        limit: '25',
        ...item.filter
      });
      navigate(`/desktops?${queryParams.toString()}`);
    } else if (key === 'desktops') {
      navigate('/desktops');
    }
  };

  return (
    <NavigationMenu className="max-w-full bg-white/5 backdrop-blur-lg">
      <NavigationMenuList className="px-4 py-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white/95 backdrop-blur-lg">
            <div className="grid grid-cols-3 gap-3 p-4 w-[600px]">
              {Object.entries(categories).map(([key, category]) => (
                <div key={key} className="space-y-2">
                  <NavigationMenuLink
                    className="text-sm font-medium text-gray-900 hover:text-gray-600 flex items-center justify-between group cursor-pointer"
                    onClick={() => handleNavigation(key)}
                  >
                    {category.title}
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </NavigationMenuLink>
                  <ul className="space-y-1">
                    {category.items.map((item) => (
                      <li key={typeof item === 'string' ? item : item.label}>
                        <NavigationMenuLink
                          className="text-sm text-gray-600 hover:text-gray-900 block py-1 cursor-pointer"
                          onClick={() => handleNavigation(key, item)}
                        >
                          {typeof item === 'string' ? item : item.label}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}