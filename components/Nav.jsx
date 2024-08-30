"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const categories = [
  { name: "General", slug: "general" },
  { name: "Business", slug: "business" },
  { name: "Entertainment", slug: "entertainment" },
  { name: "Sports", slug: "sports" },
  { name: "Science", slug: "science" },
  { name: "Technology", slug: "technology" },
  { name: "Education", slug: "education" },
  { name: "History", slug: "history" },
];

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <header className="bg-white shadow-md w-full">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between py-6 px-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1 items-center">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
            <Image src="/assets/icons/i4india.png" width={200} height={30} alt="logo" />
          </Link>
          
        </div>

        {session?.user?.email !== "mayank.g21@iiits.in" ? (
          <Link href="/contactus" className="text-md mr-10 font-semibold leading-6 text-gray-900 hover:text-gray-700">
            Contact Us
          </Link>
        ) : (
            <Link href="/contacts" className="text-md mr-10 font-semibold leading-6 text-gray-900 hover:text-gray-700">
            Messages
          </Link>
          )}

        <Link href="/about" className="text-md mr-10 font-semibold leading-6 text-gray-900 hover:text-gray-700">
            About Us
          </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md py-2.5 text-gray-700"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div>
                
          </div>

        {/* Desktop Menu */}
        
        <PopoverGroup className="hidden items-center lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-md font-semibold leading-6 text-gray-900 hover:text-gray-700">
              Categories
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </PopoverButton>

            <PopoverPanel className="absolute left-0 top-full z-10 mt-3 w-48 bg-white rounded-lg shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4 space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/pages/category/${category.slug}`}
                    className="block w-full text-left text-gray-900 hover:bg-gray-100 rounded-lg p-2"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          {session?.user? (
            <>
            {session?.user?.email !== "mayank.g21@iiits.in" && (
                <Link
                href="/profile"
                className="text-md font-semibold leading-6 text-gray-900 hover:text-gray-700"
              >
                Bookmarks
              </Link>
            )}
              
              <Menu as="div" className="relative">
                <MenuButton>
                  <Image
                    src={session?.user.image}
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    alt="profile"
                  />
                </MenuButton>
                <MenuItems className="absolute z-50 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4 space-y-2">
                    {session?.user?.email === "mayank.g21@iiits.in" && (
                        <div>
                            <Link
                        href="/create-news"
                        className="block w-full text-left text-gray-900 hover:bg-gray-100 rounded-lg p-2"
                      >
                        Create News
                      </Link>
                      <Link
                      className="block w-full text-left text-gray-900 hover:bg-gray-100 rounded-lg p-2"
                      href="/profile">
                                     Admin Portal
                                    </Link>
                                    <hr />
                        </div>
                     
                    )}
                    

                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={signOut}
                          className={`${
                            active ? "bg-gray-100" : ""
                          } w-full text-left text-gray-900 rounded-lg p-2`}
                        >
                          Sign Out
                        </button>
                        
                      )}
                      
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </>
          ) : 
          (
                        providers &&
                        Object.values(providers).map((provider) => (
                          <button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className="text-md font-semibold leading-6 text-gray-900 hover:text-gray-700"
                          >
                            Sign In
                          </button>
                        ))
                      )
          }
        </PopoverGroup>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center">
              <Image src="/assets/icons/i4india.png" width={150} height={30} alt="logo" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* Mobile Category Dropdown */}
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Categories
                    <ChevronDownIcon className="h-5 w-5 flex-none group-open:rotate-180" aria-hidden="true" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/pages/category/${category.slug}`}
                        className="block w-full text-left text-gray-900 hover:bg-gray-100 rounded-lg p-2"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              </div>

              {/* Auth Links for Mobile */}
              <div className="py-6 space-y-2">
                {session?.user ? (
                  <>
                    {session?.user?.email === "mayank.g21@iiits.in" && (
                      <Link
                        href="/create-news"
                        className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Create News
                      </Link>
                    )}
                    {session?.user?.email !== "mayank.g21@iiits.in" && (
                <Link
                href="/profile"
                className="block w-full text-left rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Bookmarks
              </Link>
            )}
                    {session?.user?.email === "mayank.g21@iiits.in" && (
                        <Link
                        href="/profile"
                        className="flex justify-between rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        <div>Admin Portal</div>
                        <div>
                          <Image
                            src={session?.user.image}
                            width={25}
                            height={25}
                            className="rounded-full"
                            alt="profile"
                          />
                        </div>
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={signOut}
                      className="block w-full text-left rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className="block w-full text-left rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Sign In
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Nav;
