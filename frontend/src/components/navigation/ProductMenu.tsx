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
      'Up to 20" Monitors',
      '21-22" Monitors',
      '23-24" Monitors',
      '27-28" Monitors',
      '32" Monitors',
      "UltraWide Monitors",
      "Portable Monitors",
      "Monitor Accessories",
    ],
  },
}

export function ProductMenu() {
  const navigate = useNavigate();

  return (
    <NavigationMenu className="max-w-full bg-white/5 backdrop-blur-lg">
      <NavigationMenuList className="px-4 py-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-white bg-transparent hover:bg-white/10">
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white/95 backdrop-blur-lg">
            <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
              {Object.entries(categories).map(([key, category]) => (
                <div key={key} className="space-y-2">
                  <NavigationMenuLink
                    className="text-sm font-medium text-gray-900 hover:text-gray-600 flex items-center justify-between group cursor-pointer"
                    onClick={() => key === 'laptops' && navigate('/laptops')}
                  >
                    {category.title}
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </NavigationMenuLink>
                  <ul className="space-y-1">
                    {category.items.map((item) => (
                      <li key={item}>
                        <NavigationMenuLink
                          className="text-sm text-gray-600 hover:text-gray-900 block py-1 cursor-pointer"
                          onClick={() => key === 'laptops' && navigate('/laptops')}
                        >
                          {item}
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