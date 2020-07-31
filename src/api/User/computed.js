import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    },

    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;

      try {
        const exists = await prisma.$exists.user({
          AND: [
            { id: parentId },
            {
              followers_some: {
                id: user.id,
              },
            },
          ],
        });

        return exists;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;

      return user.id === parentId;
    },
  },

  Post: {
    isLiked: async (parent, _, { request }) => {
      // 현재 로그인 된 사용자 정보를 받아온다 [A]
      const { user } = request;

      // 현재 Post의 id를 받아온다. [B]
      const { id } = parent;

      //B의 likes 중 A가 있는지 검증하여 리턴한다.
      const exist = await prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id,
            },
          },
          {
            post: {
              id,
            },
          },
        ],
      });

      return exist;
    },
  },
};
