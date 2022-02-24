import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
	ChevronDownIcon,
	LogoutIcon,
	CalendarIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function Dropdown({ name }) {
	const logoutHandler = () => {
		signOut({ callbackUrl: `/login` });
	};
	return (
		<div>
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="inline-flex justify-center w-full px-4 py-2 font-medium text-indigo-200 text-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
						{name}
						<ChevronDownIcon
							className="w-5 h-5 mt-1 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
							aria-hidden="true"
						/>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 w-60 mt-2 origin-top-right bg-[#2b2f53] divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="px-3 py-1 ">
							<Link href="/manage/events/1/basicinfo" passHref>
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active ? 'text-[#2b2f53] bg-white' : 'text-gray-400'
											} group flex rounded-md items-center w-full px-2 py-2 text-md`}
										>
											<CalendarIcon
												className="w-5 h-5 mr-2 font-semibold"
												aria-hidden="true"
											/>
											Manage my events
										</button>
									)}
								</Menu.Item>
							</Link>
							<Menu.Item>
								{({ active }) => (
									<button
										className={`${
											active ? 'text-[#2b2f53] bg-white' : 'text-gray-400'
										} group flex rounded-md items-center w-full px-2 py-2 text-md`}
										onClick={logoutHandler}
									>
										<LogoutIcon
											className="w-5 h-5 mr-2 font-semibold"
											aria-hidden="true"
										/>
										Logout
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}
