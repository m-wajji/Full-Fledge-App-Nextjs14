"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { getUsers } from "@/actions/getUsers";
import { deleteUser } from "@/actions/deleteUser";
import { useRouter } from "next/navigation";
import { updateUser } from "@/actions/updateUser";

const HomePage = () => {
  const [usersInfo, setUsersInfo] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsersInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [usersInfo]);

  const handleDelete = useCallback((userId: string) => {
    deleteUser(userId).then(() => {
      router.refresh();
    });
  }, []);

  const handleLike = useCallback((userId: string, state: boolean) => {
    updateUser(userId, state).then(() => {
      router.refresh();
    });
  }, []);
  const handleDisLike = useCallback((userId: string, state: boolean) => {
    updateUser(userId,state).then(() => {
      router.refresh();
    });
  }, []);

  return (
    <main className="flex flex-col justify-center">
      <header className="flex justify-between items-center h-[100px] px-8 ">
        <h1 className="text-4xl font-bold text-slate-700">All Students</h1>
        <Button asChild>
          <Link href={"/userForm"} className="flex gap-x-2 items-center">
            <span>
              <FaPlus size={18} />
            </span>
            Add New
          </Link>
        </Button>
      </header>
      <div className="flex flex-col items-center mt-10 gap-y-6">
        {usersInfo?.map((userInfo: any) => {
          return (
            <Card
              key={userInfo.id}
              className="w-[600px] shadow-blue-300 shadow-lg"
            >
              <CardHeader>
                <CardTitle>{userInfo.name}</CardTitle>
                <CardDescription>
                  Age: {userInfo.age} <br />
                  Semester: {userInfo.semester}
                </CardDescription>
              </CardHeader>
              <CardContent>{userInfo.info}</CardContent>
              <CardFooter className="flex items-center justify-between">
                <MdDeleteForever
                  size={25}
                  color="red"
                  onClick={() => handleDelete(userInfo.id)}
                />
                {userInfo.like ? (
                  <IoMdHeart size={25} color="red" onClick={() => handleDisLike(userInfo.id, false)} />
                ) : (
                  <CiHeart size={25} color="red" onClick={() => handleLike(userInfo.id, true)} />
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
