<template>
  <div class="flex flex-col bg-white h-full justify-start p-5">
    <template v-if="!photo">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </template>
    <template v-else>
      <div class="flex justify-between items-center">
        <v-btn fab text :to="{ name: 'home' }" exact>
          <v-icon>mdi-arrow-left</v-icon></v-btn
        >
        <img :src="require('@/assets/logo.png')" alt="" srcset="" />
        <ShareNetwork
          network="whatsapp"
          :url="'https://resistenciapp.web.app/#/photos/' + photoId"
          title="Mira esta foto de lo que está pasando en este momento!"
          description=""
          hashtags="#resistenciapp"
        >
          <v-icon large>mdi-whatsapp</v-icon>
        </ShareNetwork>
      </div>
      <img
        style="width: 100%; height: 100%"
        :src="photo.photoUrl"
        class="h-48 w-full object-contain" />
      <p class="text-center mt-5">{{ photo.comment }}</p>
      <span class="text-xs mx-1">{{
        photo.timestamp.toDate().toLocaleString()
      }}</span>
      <v-divider></v-divider>
      <new-comment
        class="my-3"
        @send-comment="sendComment"
        :text.sync="commentText"
      ></new-comment>
      <suggestion-card
        class="m-1"
        v-for="comment in comments"
        :key="comment.id"
        :message="comment.comment"
        :timestamp="comment.timestamp.toDate()"
        :dislikes="comment.dislikes"
        :likes="comment.likes"
        @vote="(val) => likecomment(comment.id, val)"
    /></template>
  </div>
</template>

<script>
import { ShareNetwork } from "vue-social-sharing";
import { db, functions } from "../firebaseConfig";
const SuggestionCard = () => import("@/components/SuggestionCard.vue");
const NewComment = () => import("@/components/NewComment.vue");
export default {
  components: {
    SuggestionCard,
    NewComment,
    ShareNetwork,
  },
  props: {
    photoId: {
      type: String,
      required: true,
    },
  },
  created() {
    db.collection("photos")
      .doc(this.photoId)
      .onSnapshot((doc) => (this.photo = { id: doc.id, ...doc.data() }));
    db.collection("photos")
      .doc(this.photoId)
      .collection("comments")
      .orderBy("totalLikes", "desc")
      .onSnapshot((snapshot) => {
        this.comments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
  },
  data() {
    return {
      photo: null,
      comments: [],
      commentText: "",
    };
  },
  methods: {
    async sendComment() {
      const votecomment = functions.httpsCallable("commentPhoto");
      await votecomment({ photoId: this.photoId, comment: this.commentText });
      this.commentText = "";
      window.alert("Comentario enviado.");
    },
    likecomment(commentId, vote) {
      const votecomment = functions.httpsCallable("voteCommentPhoto");
      votecomment({ commentId, vote, photoId: this.photoId });
    },
  },
};
</script>

<style lang="scss" scoped></style>
