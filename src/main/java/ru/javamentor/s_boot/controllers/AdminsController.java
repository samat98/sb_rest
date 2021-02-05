package ru.javamentor.s_boot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.javamentor.s_boot.model.Role;
import ru.javamentor.s_boot.model.User;
import ru.javamentor.s_boot.services.UserService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/admin")
public class AdminsController {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/edit")
    public User getEditForm(@RequestParam Long id, Model model) {
        return userService.findUser(id).orElseThrow(() -> new UsernameNotFoundException("user is not exists"));
    }

    @PostMapping("/adduser")
    public User addUser(@Validated(User.class) @ModelAttribute User user,
                          @RequestParam("authorities") List<String> values,
                          BindingResult result) {
        if(result.hasErrors()) {
            throw new IllegalArgumentException();
        }
        Set<Role> roleSet = userService.getSetOfRoles(values);
        user.setRoles(roleSet);
        userService.saveUser(user);
        return user;
    }

    @PutMapping("/update")
    public User updateUser(@Validated(User.class) @ModelAttribute User editedUser,
                             @RequestParam("authorities") List<String> values,
                             BindingResult result) {
        if(result.hasErrors()) {
            throw new IllegalArgumentException();
        }
        Set<Role> roleSet = userService.getSetOfRoles(values);
        editedUser.setRoles(roleSet);
        userService.updateUser(editedUser);
        return editedUser;
    }

    @DeleteMapping("/delete")
    public Long deleteUser(@RequestParam Long id) {
        User user = userService.findUser(id).orElseThrow(() -> new UsernameNotFoundException("user not found"));
        userService.deleteUser(user.getId());
        return id;
    }
}
