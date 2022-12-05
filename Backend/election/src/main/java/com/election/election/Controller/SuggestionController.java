package com.election.election.Controller;

import com.election.election.Entity.Comment;
import com.election.election.Entity.Suggestion;
import com.election.election.Service.SuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class SuggestionController {

    @Autowired
    SuggestionService suggestionService;

    @PostMapping("/addSuggestion")
    public Suggestion addSuggestion(@RequestBody Suggestion suggestion) {
        System.out.println(suggestion);
        return suggestionService.addSuggestionService(suggestion);
    }

    @GetMapping("/publicSuggestions/{page}")
    public Page<Suggestion> getPublicSuggestions(@PathVariable("page") int page){
        return suggestionService.getPublicSuggestionsService(page);
    }

    @PutMapping("/likes/{id}/{likes}")
    public void addOneLike(@PathVariable("id") long id, @PathVariable("likes") int likes){
        suggestionService.addLike(id, likes);
    }

    @PostMapping("/addComment")
    public Comment addComment(@RequestBody Comment comment) {
        return suggestionService.addComment(comment);
    }

    @GetMapping("/getComments/{id}/{page}")
    public Page<Comment> getComments(@PathVariable("id") long id, @PathVariable("page") int page){
        return suggestionService.loadComments(id, page);

    }

}
