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
};
