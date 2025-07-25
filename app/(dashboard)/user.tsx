import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/lib/auth';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { SignOutButton } from '@/components/auth/logout';

export async function User() {
    let session = await auth();
    let user = session?.user;

    const test = async()=> {
        const appLanguagesResponse = await fetch('/api/auth/signout');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                >
                    <Image
                        src={user?.image ?? '/placeholder-user.jpg'}
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                {user ?
                    // <DropdownMenuItem>
                    //     <Link href="#" onClick={()=> test()}>Sign Out</Link>
                    // </DropdownMenuItem>
                    <DropdownMenuItem>
                        <SignOutButton />
                    </DropdownMenuItem>
                    :
                    <DropdownMenuItem>
                        <Link href="/login">Sign In</Link>
                    </DropdownMenuItem>
                }

                {/*{user ? (*/}
                {/*    <DropdownMenuItem>*/}
                {/*        <form*/}
                {/*            action={async () => {*/}
                {/*                await signOut();*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <button type="submit">Sign Out</button>*/}
                {/*        </form>*/}
                {/*    </DropdownMenuItem>*/}
                {/*) : (*/}
                {/*    <DropdownMenuItem>*/}
                {/*        <Link href="/login">Sign In</Link>*/}
                {/*    </DropdownMenuItem>*/}
                {/*)}*/}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
